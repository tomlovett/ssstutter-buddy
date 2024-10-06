# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'studies/edit' do
  let(:study) do
    Study.create!
  end

  before do
    assign(:study, study)
  end

  it 'renders the edit study form' do
    render

    assert_select 'form[action=?][method=?]', study_path(study), 'post' do
    end
  end
end
