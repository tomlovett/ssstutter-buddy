# frozen_string_literal: true

class R::StudiesController < R::BaseController
  before_action :set_study, only: %i[show edit update destroy publish]

  # GET /r/studies
  def index
    active_studies = Current.user.researcher.studies.active
    draft_studies = Current.user.researcher.studies.draft
    paused_studies = Current.user.researcher.studies.paused
    closed_count = Current.user.researcher.studies.closed.count

    render inertia: 'r/Studies/index', props: { active_studies:, draft_studies:, paused_studies:, closed_count: }
  end

  # GET /r/studies/1
  def show
    return redirect_to '/r' unless allowed_to?(:view?, @study)
    return redirect_to "/r/studies/#{@study.id}/edit" if @study.published_at.blank?

    active_connections = @study.connections.includes(:participant).order(updated_at: :desc).active.map(&:as_json)
    invitations = @study.connections.includes(:participant).order(updated_at: :desc).invited.map(&:as_json)
    completed_connections = @study.connections.includes(:participant).order(updated_at: :desc).completed.map(&:as_json)
    declined_count = @study.connections.includes(:participant).declined.count

    render inertia: 'r/Studies/show',
           props: { study: @study.as_json, active_connections:, invitations:, completed_connections:,
                    declined_count: }
  end

  # GET /r/studies/closed
  def closed
    render inertia: 'r/Studies/closed', props: { studies: Current.user.researcher.studies.closed }
  end

  # GET /r/studies/new
  def new
    @study = Study.create!(
      researcher: Current.user.researcher,
      total_sessions: 1,
      total_hours: 1
    )

    redirect_to "/r/studies/#{@study.id}/edit"
    # render inertia: 'r/Studies/edit', props: { study: @study.as_json }
  end

  # GET /r/studies/1/edit
  def edit
    return redirect_to "/r/studies/#{params[:id]}" unless allowed_to?(:update?, @study)

    render inertia: 'r/Studies/edit', props: { study: @study.as_json }
  end

  # POST /r/studies
  def create
    @study = Study.create!(study_params.merge(researcher: Current.user.researcher))

    redirect_to "/r/studies/#{@study.id}/edit"
  end

  # PATCH/PUT /r/studies/1
  def update
    if allowed_to?(:update?, @study) && @study.update(study_params)
      redirect_to "/r/studies/#{@study.id}", status: :see_other
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

  # POST /r/studies/1/publish
  def publish
    return head :unprocessable_entity unless @study.present? && allowed_to?(:update?, @study)
    unless @study.published_at.nil? || (@study.published_at.present? && @study.paused_at.nil?)
      return head :unprocessable_entity
    end

    if PublishStudy.new(study: @study, study_params:).call
      redirect_to "/r/studies/#{@study.id}", notice: 'Study published successfully!'
    else
      redirect_to "/r/studies/#{@study.id}/edit",
                  alert: 'Unable to publish study. Please check all required fields are filled out.'
    end
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
      :published_at,
      :paused_at,
      :closed_at,
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
