# frozen_string_literal: true

class R::StudiesController < ApplicationController
  before_action :set_study, only: %i[show edit update destroy]

  # GET /r/studies
  def index
    @studies = @current_user.researcher.studies
  end

  # GET /r/studies/1
  def show
    connections = @study.connections.order(updated_at: :desc).map(&:as_json)

    render inertia: 'r/Studies/show', props: { study: @study.as_json, connections: }
  end

  # GET /r/studies/new
  def new
    @study = Study.create(researcher: @current_user&.researcher)

    render inertia: 'r/Studies/edit', props: { study: @study.as_json }
  end

  # GET /r/studies/1/edit
  def edit
    render inertia: 'r/Studies/edit', props: { study: @study.as_json }
  end

  # POST /r/studies
  def create
    @study = Study.new(study_params)

    if @study.save
      redirect_to @study, notice: 'Success!'
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /r/studies/1
  def update
    if @study.update(study_params)
      head :ok
    else
      head :unprocessable_entity
    end
  end

  # DELETE /r/studies/1
  def destroy
    @study.destroy
    redirect_to studies_url, notice: 'Success!', status: :see_other
  end

  private

  def set_study
    @study = Study.find(params[:id])
  end

  def study_params
    params.fetch(:study).permit(
      :title,
      :short_desc,
      :long_desc,
      :open_date,
      :close_date,
      :methodologies,
      :min_age,
      :max_age,
      :city,
      :state,
      :country,
      :total_hours,
      :total_sessions,
      :duration,
      :duration_number,
      :duration_factor,
      :follow_up,
      :remuneration,
      :primary_researcher_id
    )
  end
end
