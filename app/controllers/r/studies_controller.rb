# frozen_string_literal: true

class R::StudiesController < R::BaseController
  before_action :set_study, only: %i[show edit update publish]

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

    active_connections = @study.connections.includes(:participant).order(updated_at: :desc).accepted.map(&:as_json)
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

  # GET /r/studies/1/edit
  def edit
    return redirect_to "/r/studies/#{params[:id]}" unless allowed_to?(:update?, @study)

    render inertia: 'r/Studies/edit', props: { study: @study.as_json }
  end

  # POST /r/studies
  def create
    @study = Current.user.researcher.studies.create!(study_params)

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

  # POST /r/studies/1/publish
  def publish
    return head :unauthorized unless allowed_to?(:update?, @study)
    return head :unprocessable_entity unless @study.present? && can_publish?

    if @study.update(study_params) && PublishStudy.new(study: @study).call
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

  def can_publish?
    @study.published_at.nil? || (@study.published_at.present? && @study.paused_at.present?)
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
      :total_hours,
      :total_sessions,
      :duration,
      :follow_up,
      :remuneration,
      :location_type,
      location_attributes: %i[id city state country _destroy _delete]
    )
  end
end
