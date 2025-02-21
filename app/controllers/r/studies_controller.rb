# frozen_string_literal: true

class R::StudiesController < ApplicationController
  before_action :set_study, only: %i[show edit update destroy]

  # GET /r/studies
  def index
    @studies = @current_user.researcher.studies
  end

  # GET /r/studies/1
  def show; end

  # GET /r/studies/new
  def new
    @study = Study.new(
      primary_researcher: @current_user&.researcher,
      min_age: 18,
      open_date: Time.zone.today,
      total_hours: 2,
      total_sessions: 2,
      duration: '3 days'
    )
  end

  # GET /r/studies/1/edit
  def edit; end

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
      redirect_to @study, notice: 'Success!', status: :see_other
    else
      render :edit, status: :unprocessable_entity
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
      :study_type,
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
