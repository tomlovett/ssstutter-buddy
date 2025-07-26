# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin, type: :lib do
  describe 'Emails' do
    before do
      create_list(:participant, 9)
      create_list(:researcher, 8)
    end

    describe '.users' do
      it 'returns all user emails' do
        expect(described_class.users.split(', ').count).to eq(17)
      end
    end

    describe '.participants' do
      it 'returns all participant emails' do
        expect(described_class.participants.split(', ').count).to eq(9)
      end
    end

    describe '.researchers' do
      it 'returns all researcher emails' do
        expect(described_class.researchers.split(', ').count).to eq(8)
      end
    end
  end
end
