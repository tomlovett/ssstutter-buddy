# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Study do
  context 'with a valid record' do
    let(:study) { create(:study) }

    it 'has the expected attributes and relationships' do
      expect { study.save! }.not_to raise_error
    end
  end
end
