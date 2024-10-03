# frozen_string_literal: true

class ResearchersController < ApplicationController
  before_action :set_researcher, only: %i[show edit update destroy]

  # GET /researchers/1
  def show; end

  # GET /researchers/new
  def new
    @researcher = Researcher.new
  end

  # GET /researchers/1/edit
  def edit; end

  # POST /researchers
  def create
    @researcher = Researcher.new(researcher_params)

    if @researcher.save
      redirect_to @researcher, notice: t.success
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /researchers/1
  def update
    if @researcher.update(researcher_params)
      redirect_to @researcher, notice: t.success, status: :see_other
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /researchers/1
  def destroy
    @researcher.destroy
    redirect_to researchers_url, notice: t.success, status: :see_other
  end

  private

  def set_researcher
    @researcher = Researcher.find(params[:id])
  end

  def researcher_params
    params.fetch(:researcher).permit(
      :titles,
      :institution,
      :university_profile_url,
      :bio,
      :research_interests
    )
  end
end
