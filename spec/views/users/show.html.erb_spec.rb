# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'users/show' do
  before { assign(:user, create(:user)) }

  it 'renders attributes in <p>' do
    render
  end
end
