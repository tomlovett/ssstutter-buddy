# frozen_string_literal: true

class P::BaseController < ApplicationController
  before_action :redirect_if_not_participant
end
