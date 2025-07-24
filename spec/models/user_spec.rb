# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  describe 'model creation' do
    context 'with valid attributes' do
      it 'creates a new model' do
        expect { described_class.create!(attributes_for(:user)) }.not_to raise_error
      end
    end

    context 'with invalid attributes' do
      it 'requires email' do
        user = build(:user, email: nil)
        expect(user).not_to be_valid
        expect(user.errors[:email]).to include("can't be blank")
      end

      it 'requires unique email' do
        create(:user, email: 'test@example.com')
        user = build(:user, email: 'test@example.com')
        expect(user).not_to be_valid
        expect(user.errors[:email]).to include('has already been taken')
      end

      it 'requires valid email format' do
        user = build(:user, email: 'invalid-email')
        expect(user).not_to be_valid
        expect(user.errors[:email]).to include('is invalid')
      end

      it 'requires first_name' do
        user = build(:user, first_name: nil)
        expect(user).not_to be_valid
        expect(user.errors[:first_name]).to include("can't be blank")
      end

      it 'requires last_name' do
        user = build(:user, last_name: nil)
        expect(user).not_to be_valid
        expect(user.errors[:last_name]).to include("can't be blank")
      end

      it 'requires password on creation' do
        user = build(:user, password: nil)
        expect(user).not_to be_valid
        expect(user.errors[:password]).to include("can't be blank")
      end

      it 'requires password minimum length' do
        user = build(:user, password: 'short')
        expect(user).not_to be_valid
        expect(user.errors[:password]).to include('is too short (minimum is 8 characters)')
      end
    end
  end

  describe '#as_json' do
    let(:user) { create(:user) }

    it 'includes methods' do
      expect(user.as_json).to have_key('home_page')
    end

    context 'when user is a participant' do
      before { create(:participant, user:) }

      it 'includes the participant association' do
        json = user.as_json
        expect(json).to have_key('participant')
        expect(json).not_to have_key('researcher')
      end
    end

    context 'when user is a researcher' do
      before { create(:researcher, user:) }

      it 'includes the researcher association' do
        json = user.as_json
        expect(json).not_to have_key('participant')
        expect(json).to have_key('researcher')
      end
    end
  end

  describe '#full_name' do
    it 'returns first and last name' do
      user = create(:user, first_name: 'John', last_name: 'Doe')
      expect(user.full_name).to eq('John Doe')
    end
  end

  describe '#home_page' do
    let(:user) { create(:user) }

    context 'when user is a participant' do
      before { create(:participant, user:) }

      it 'returns participant home page' do
        expect(user.home_page).to eq('/p')
      end
    end

    context 'when user is a researcher' do
      before { create(:researcher, user:) }

      it 'returns researcher home page' do
        expect(user.home_page).to eq('/r')
      end
    end

    context 'when user has not created their participant or researcher' do
      it 'returns role selection page' do
        expect(user.home_page).to eq("/u/#{user.id}/select-role")
      end
    end
  end

  describe '#assign_activation_pin!' do
    let(:user) { create(:user, activation_pin: '') }

    it 'assigns a new activation pin' do
      expect { user.assign_activation_pin! }.to change(user, :activation_pin)

      expect(user.reload.activation_pin.length).to eq(6)
      expect(user.reload.activation_pin.to_i.to_s).to eq(user.reload.activation_pin.to_s)
    end
  end

  describe '#researcher?' do
    let(:user) { create(:user) }

    context 'when user is a researcher' do
      before { create(:researcher, user:) }

      it 'returns true' do
        expect(user.researcher?).to be true
      end
    end

    context 'when user is a participant' do
      it 'returns false' do
        expect(user.researcher?).to be false
      end
    end
  end

  describe '#participant?' do
    let(:user) { create(:user) }

    context 'when user is a participant' do
      before { create(:participant, user:) }

      it 'returns true' do
        expect(user.participant?).to be true
      end
    end

    context 'when user is a researcher' do
      it 'returns false' do
        expect(user.participant?).to be false
      end
    end
  end

  describe '#admin?' do
    let(:user) { create(:user) }

    context 'when in development environment' do
      before { allow(Rails.env).to receive(:development?).and_return(true) }

      it 'returns true' do
        expect(user.admin?).to be true
      end
    end

    context 'when email is in admin list' do
      before do
        allow(Rails.env).to receive(:development?).and_return(false)
        allow(ENV).to receive(:fetch).with('ADMIN_EMAILS', '').and_return('admin@example.com, test@example.com')
      end

      it 'returns true for admin email' do
        user = create(:user, email: 'admin@example.com')
        expect(user.admin?).to be true
      end

      it 'returns false for non-admin email' do
        user = create(:user, email: 'other@example.com')
        expect(user.admin?).to be false
      end
    end
  end
end
