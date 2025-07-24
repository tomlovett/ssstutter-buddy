# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Session do
  describe 'model creation' do
    context 'with valid attributes' do
      it 'creates a new model' do
        expect { create(:session) }.not_to raise_error
      end
    end
  end

  describe 'associations' do
    let(:session) { create(:session) }

    it 'belongs to user' do
      expect(session.user).to be_present
    end
  end
end
