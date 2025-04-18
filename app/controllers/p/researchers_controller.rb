# frozen_string_literal: true

class P::ResearchersController < ApplicationController
  before_action :redirect_if_not_participant
  before_action :set_researcher, only: :show

  # GET /p/researchers/1
  def show
    render inertia: 'p/Researchers/show', props: { researcher: @researcher.as_json }
  end

  private

  def set_researcher
    @researcher = Researcher.find(params[:id])
  end
end
