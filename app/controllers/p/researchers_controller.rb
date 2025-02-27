# frozen_string_literal: true

class P::ResearchersController < ApplicationController
  before_action :set_researcher, only: :show

  # GET /p/researchers/1
  def show; end

  private

  def set_researcher
    @researcher = Researcher.find(params[:id])
  end
end
