# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Authentication
  include Gatekeeping

  skip_forgery_protection
end
