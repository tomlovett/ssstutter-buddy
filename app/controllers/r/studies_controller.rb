# frozen_string_literal: true

class R::StudiesController < R::BaseController
  before_action :set_study, only: %i[show edit update destroy]

  # GET /r/studies
  def index
    @studies = Current.user.researcher.studies
  end

  # GET /r/studies/1
  def show
    return redirect_to '/r' unless allowed_to?(:show?, @study)

    connections = @study.connections.order(updated_at: :desc).map(&:as_json)

    render inertia: 'r/Studies/show', props: { study: @study.as_json, connections: }
  end

  # GET /r/studies/new
  def new
    @study = Study.new(
      researcher_id: 1,
      total_sessions: 1,
      total_hours: 1
    )

    render inertia: 'r/Studies/edit', props: { study: @study.as_json }
  end

  # GET /r/studies/1/edit
  def edit
    return redirect_to "/r/studies/#{params[:id]}" unless allowed_to?(:edit?, @study)

    render inertia: 'r/Studies/edit', props: { study: @study.as_json }
  end

  # POST /r/studies
  def create
    @study = Study.new(study_params)

    if @study.save
      render json: @study.as_json, status: :created
    else
      render json: @study.errors.as_json, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /r/studies/1
  def update
    if allowed_to?(:update?, @study) && @study.update(study_params)
      render json: @study.as_json, status: :created
    else
      render json: @study.errors.as_json, status: :unprocessable_entity
    end
  end

  # DELETE /r/studies/1
  def destroy
    return head :unauthorized unless allowed_to?(:destroy?, @study)

    @study.destroy
    redirect_to studies_url, notice: 'Success!', status: :created
  end

  private

  def set_study
    @study = Study.find(params[:id])
  end

  def study_params
    params.fetch(:study).permit(
      :researcher_id,
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
      :follow_up,
      :remuneration
    )
  end
end
