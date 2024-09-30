# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'researchers/show' do
  before do
    assign(:researcher, Researcher.create!)
  end

  it 'renders attributes in <p>' do
    render
  end
end
