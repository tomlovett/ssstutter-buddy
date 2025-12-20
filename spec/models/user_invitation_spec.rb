# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserInvitation do
  describe 'model creation' do
    context 'with valid attributes' do
      it 'creates a new model' do
        expect { create(:user_invitation) }.not_to raise_error
      end
    end

    context 'with invalid attributes' do
      it 'requires email' do
        user_invitation = build(:user_invitation, email: nil)

        expect(user_invitation).not_to be_valid
        expect(user_invitation.errors[:email]).to include("can't be blank")
      end

      it 'requires unique email' do
        create(:user_invitation, email: 'test@example.com')
        user_invitation = build(:user_invitation, email: 'test@example.com')

        expect(user_invitation).not_to be_valid
        expect(user_invitation.errors[:email]).to include('has already been taken')
      end

      it 'requires valid email format' do
        user_invitation = build(:user_invitation, email: 'invalid-email')

        expect(user_invitation).not_to be_valid
        expect(user_invitation.errors[:email]).to include('is invalid')
      end

      it 'requires invited_by' do
        user_invitation = build(:user_invitation, invited_by_id: nil)

        expect(user_invitation).not_to be_valid
        expect(user_invitation.errors[:invited_by_id]).to include('can\'t be blank')
      end

      it 'cannot use an email that belongs to a complete user' do
        create(:user, email: 'test@example.com')
        user_invitation = build(:user_invitation, email: 'test@example.com')

        expect(user_invitation).not_to be_valid
        expect(user_invitation.errors[:email]).to include('belongs to an existing user')
      end

      it 'can use an email that belongs to a provisional user' do
        create(:user, :provisional, email: 'test@example.com')
        user_invitation = build(:user_invitation, email: 'test@example.com')

        expect(user_invitation).to be_valid
      end
    end
  end

  describe 'scopes' do
    let!(:pending_invitation) { create(:user_invitation) }
    let!(:accepted_invitation) { create(:user_invitation, :accepted) }

    it 'filters pending invitations' do
      expect(described_class.pending).to include(pending_invitation)
      expect(described_class.pending).not_to include(accepted_invitation)
    end
  end

  describe 'email normalization' do
    it 'normalizes email to lowercase and strips whitespace' do
      user_invitation = create(:user_invitation, email: '  TEST@EXAMPLE.COM  ')

      expect(user_invitation.email).to eq('test@example.com')
    end
  end
end
