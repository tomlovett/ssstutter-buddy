# frozen_string_literal: true

class R::BaseController < ApplicationController
  before_action :redirect_if_not_researcher
end
