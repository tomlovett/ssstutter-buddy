# frozen_string_literal: true

class R::ResearchersController < ApplicationController
  before_action :set_researcher, only: %i[show edit update destroy]

  # GET /r
  def home
    @researcher = Researcher.find(1)

    props = {
      researcher: @researcher.to_json,
      studies: @researcher.studies.as_json,
      active_connections: @researcher.active_connections.as_json(include: :participant)
    }

    render inertia: 'r/Researchers/home', props:
  end

  # GET /r/researchers/1
  def show
    @researcher = Researcher.find(1)

    render inertia: 'r/Researchers/show', props: { researcher: @researcher.to_json }
  end

  # GET /r/researchers/new
  def new
    @researcher = Researcher.new(user_id: params[:user_id])

    render inertia: 'r/Researchers/edit', props: { researcher: @researcher.to_json }
  end

  # GET /r/researchers/1/edit
  def edit
    @researcher = Researcher.find(1)

    render inertia: 'r/Researchers/edit', props: { researcher: @researcher.to_json }
  end

  # POST /r/researchers
  def create
    @researcher = Researcher.new(researcher_params)

    if @researcher.save
      redirect_to @researcher, notice: t.success
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /r/researchers/1
  def update
    if @researcher.update(researcher_params)
      head :ok
    else
      head :unprocessable_entity
    end
  end

  # DELETE /r/researchers/1
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
