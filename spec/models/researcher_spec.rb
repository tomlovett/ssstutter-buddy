# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Researcher do
  let(:researcher) { create(:researcher) }

  context 'with a valid record' do
    it 'delegates first_name to the user model' do
      expect(researcher.first_name).to eq(researcher.user.first_name)
    end
  end
end
