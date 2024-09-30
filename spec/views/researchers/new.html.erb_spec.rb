# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'researchers/new' do
  before do
    assign(:researcher, Researcher.new)
  end

  it 'renders new researcher form' do
    render

    assert_select 'form[action=?][method=?]', researchers_path, 'post' do
    end
  end
end
