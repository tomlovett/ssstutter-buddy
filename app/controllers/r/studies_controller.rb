# frozen_string_literal: true

class R::StudiesController < R::BaseController
  allow_unauthenticated_access only: %i[verify_status]
  skip_before_action :redirect_if_not_researcher, only: %i[verify_status]
  skip_before_action :redirect_if_not_complete, only: %i[verify_status]
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

    active_connections = @study.connections.includes(:participant).order(updated_at: :desc).map(&:as_json)
    invitations = @study.invitations.invited.includes(:participant).order(updated_at: :desc).as_json
    completed_connections = @study.connections.includes(:participant).order(updated_at: :desc).completed.map(&:as_json)
    declined_count = @study.invitations.declined.count

    render inertia: 'r/Studies/show',
           props: { study: @study.as_json, active_connections:, invitations:, completed_connections:,
                    declined_count: }
  end

  # GET /r/studies/closed
  def closed
    render inertia: 'r/Studies/closed', props: { studies: Current.user.researcher.studies.closed }
  end

  # GET /r/studies/verify_status?token=...
  def verify_status
    payload = verify_token(params[:token])
    return render_error('Invalid or expired token.') unless payload

    study = Study.find_by(id: payload[:study_id])
    return render_error('Study not found.') unless study

    action = payload[:action]

    case action
    when 'verify_active'
      if study.status == 'closed'
        return render inertia: 'r/Studies/verify/AlreadyClosed', props: { study: study.as_json }
      end

      study.update(last_verified_active: Time.current)

      render inertia: 'r/Studies/verify/VerifyActive', props: { study: study.as_json }
    when 'mark_inactive'
      study.update(closed_at: Time.current) if study.status != 'closed'

      render inertia: 'r/Studies/verify/MarkInactive', props: { study: study.as_json }
    else
      render_error('Invalid action in token.')
    end
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

    unless @study.update(study_params)
      return redirect_to "/r/studies/#{@study.id}/edit",
                         alert: 'Unable to publish study. Please check all required fields are filled out.'
    end

    validation_errors = PublishStudy.new(study: @study).call

    if validation_errors.blank?
      redirect_to "/r/studies/#{@study.id}", notice: 'Study published successfully!'
    else
      redirect_to "/r/studies/#{@study.id}/edit", alert: "Issues publishing study: #{validation_errors.join(', ')}"
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
      :irb_number,
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

  def verify_token(token)
    return nil if token.blank?

    verifier = Rails.application.message_verifier('study_verification')
    verifier.verify(token)
  rescue ActiveSupport::MessageVerifier::InvalidSignature, ActiveSupport::MessageVerifier::InvalidMessage
    nil
  end

  def render_error(message)
    render inertia: 'r/Studies/verify/VerifyError', props: { error: message }, status: :unprocessable_entity
  end
end
