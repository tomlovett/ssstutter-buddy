# frozen_string_literal: true

class PublishStudy
  def initialize(study:, study_params:)
    @study = study
    @study_params = study_params
    @errors = []
  end

  def call
    return false unless valid?

    if @study.published_at.nil?
      @study.update!(@study_params.merge(published_at: Time.current))
    else
      @study.update!(@study_params.merge(paused_at: nil, closed_at: nil))
    end

    send_invtiation_emails unless @study.digital_only?
  end

  private

  def send_invtiation_emails
    existing_connections = @study.connections.pluck(:participant_id)
    participants = Participant.where.not(id: existing_connections).near(@study.address, 100)

    participants.each do |participant|
      Connection.create!(
        study: @study,
        participant:,
        invitation_status: :invited
      )

      ParticipantMailer.with(study: @study, participant:).new_study_alert.deliver_later
    end
  end

  def valid?
    validate_required_fields
    validate_location
    validate_timeline
    validate_age_range
    @errors.empty?
  end

  def validate_required_fields
    required_fields = %i[title short_desc long_desc methodologies total_hours total_sessions duration remuneration]
    required_fields.each do |field|
      @errors << "#{field.to_s.humanize} is required" if @study.send(field).blank?
    end
  end

  def validate_location
    return if @study.digital_only?

    location_fields = %i[city state country]
    location_fields.each do |field|
      @errors << "#{field.to_s.humanize} is required for in-person studies" if @study.send(field).blank?
    end
  end

  def validate_timeline
    return if @study.total_hours.present? && @study.total_sessions.present? && @study.duration.present?

    @errors << 'Study timeline (total hours, sessions, and duration) must be specified'
  end

  def validate_age_range
    return unless @study.min_age.present? && @study.max_age.present?

    return unless @study.min_age > @study.max_age

    @errors << 'Minimum age cannot be greater than maximum age'
  end
end
