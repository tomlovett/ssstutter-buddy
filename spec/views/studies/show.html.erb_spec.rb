# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'studies/show' do
  before do
    assign(:study, Study.create!)
  end

  it 'renders attributes in <p>' do
    render
  end
end
