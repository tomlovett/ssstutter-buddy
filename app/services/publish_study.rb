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
    # return if @study.digital_only? || @study.location.nil?

    existing_connections = @study.connections.pluck(:participant_id)
    existing_invitations = @study.invitations.pluck(:participant_id)
    participants = Participant.joins(:location)
      .where.not(location: nil)
      .where.not(id: existing_connections)
      .where.not(id: existing_invitations)
    # .near(@study.location.coordinates, 100)

    participants.each do |participant|
      Invitation.create!(study: @study, participant:, status: :invited)

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
    return if @study.location_type == Study::DIGITAL

    if @study.location.nil?
      @errors << 'Location is required for hybrid or in-person studies'
      return
    end

    return if @study.location.complete?

    @errors << 'Location must include city, state, and country for hybrid or in-person studies'
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
