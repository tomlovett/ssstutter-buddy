# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'studies/new' do
  before do
    assign(:study, Study.new)
  end

  it 'renders new study form' do
    render

    assert_select 'form[action=?][method=?]', studies_path, 'post' do
    end
  end
end
