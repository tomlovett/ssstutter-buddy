# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'participants/show' do
  before do
    assign(:participant, Participant.create!)
  end

  it 'renders attributes in <p>' do
    render
  end
end
