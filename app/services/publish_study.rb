# frozen_string_literal: true

class PublishStudy
  def initialize(study:)
    @study = study
    @errors = []
  end

  def call
    return false unless valid?

    if @study.published_at.nil?
      @study.update!(published_at: Time.current)
    else
      @study.update!(paused_at: nil, closed_at: nil)
    end

    send_invitation_emails unless @study.digital_only?
  end

  private

  def send_invitation_emails
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
    required_fields = %i[title short_desc long_desc methodologies total_hours total_sessions remuneration]
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
    # Allow duration to be empty if total_sessions == 1
    return if @study.total_hours.present? && @study.total_sessions.present? &&
              (@study.total_sessions == 1 || @study.duration.present?)

    @errors << 'Study timeline (total hours and sessions) must be specified'
  end

  def validate_age_range
    return unless @study.min_age.present? && @study.max_age.present?

    return unless @study.min_age > @study.max_age && @study.max_age != 0

    @errors << 'Minimum age cannot be greater than maximum age'
  end
end
