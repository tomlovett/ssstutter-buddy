# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'studies/index' do
  before do
    assign(:studies, [
             Study.create!,
             Study.create!
           ])
  end

  it 'renders a list of studies' do
    render
    'div>p'
  end
end
