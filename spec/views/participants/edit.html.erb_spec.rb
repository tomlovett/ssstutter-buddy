# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'participants/edit' do
  let(:participant) do
    Participant.create!
  end

  before do
    assign(:participant, participant)
  end

  it 'renders the edit participant form' do
    render

    assert_select 'form[action=?][method=?]', participant_path(participant), 'post' do
    end
  end
end
