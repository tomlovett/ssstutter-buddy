# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  context 'with valid attributes' do
    it 'creates a new model' do
      expect { described_class.create!(attributes_for(:user)) }.not_to raise_error
    end
  end
end
