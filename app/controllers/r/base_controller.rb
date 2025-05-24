# frozen_string_literal: true

class R::BaseController < ApplicationController
  before_action :redirect_if_not_researcher
  before_action :redirect_if_not_complete

  def redirect_if_not_complete
    redirect_to "/r/researchers/#{Current.user.researcher.id}/edit" unless Current.user.researcher.complete?
  end
end
