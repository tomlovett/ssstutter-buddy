# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'participants/new' do
  before do
    assign(:participant, Participant.new)
  end

  it 'renders new participant form' do
    render

    assert_select 'form[action=?][method=?]', participants_path, 'post' do
    end
  end
end
