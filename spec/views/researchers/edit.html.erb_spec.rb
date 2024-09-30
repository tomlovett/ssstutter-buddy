# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'researchers/edit' do
  let(:researcher) do
    Researcher.create!
  end

  before do
    assign(:researcher, researcher)
  end

  it 'renders the edit researcher form' do
    render

    assert_select 'form[action=?][method=?]', researcher_path(researcher), 'post' do
    end
  end
end
