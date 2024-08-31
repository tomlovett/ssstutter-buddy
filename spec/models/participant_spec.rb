# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Participant do
  context 'with a valid record' do
    let(:participant) { create(:participant) }

    it 'saves the record' do
      expect { participant.save! }.not_to raise_error
    end
  end
end
