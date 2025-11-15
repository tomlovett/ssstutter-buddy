# frozen_string_literal: true

class PublishStudy
  def initialize(study:)
    @study = study
    @errors = []
    @participants_to_exclude = []
  end

  def call
    return @errors unless valid?

    return @errors if @study.status == 'active'

    @study.update!(published_at: Time.current, paused_at: nil, closed_at: nil)

    # existing connections
    @participants_to_exclude.concat(@study.connections.pluck(:participant_id)) if @study.connections.present?
    # existing invitations
    @participants_to_exclude.concat(@study.invitations.pluck(:participant_id)) if @study.invitations.present?

    if @study.min_age.present?
      @participants_to_exclude.concat(Participant.where('birthdate > ?', @study.min_age.years.ago).pluck(:id))
    end
    if @study.max_age.present?
      @participants_to_exclude.concat(Participant.where(birthdate: ...@study.max_age.years.ago).pluck(:id))
    end

    if @study.location_type == Study::IN_PERSON
      @participants_to_exclude.concat(Participant.where.not(id: local_participants))
    end

    Participant.where.not(id: @participants_to_exclude).find_each do |participant|
      Invitation.create!(study: @study, participant:, status: :invited)

      ParticipantMailer.with(study: @study, participant:).new_study_alert.deliver_later
    end

    [] # return empty errors array
  end

  private

  def local_participants
    # `to_a` syntax prevents a SQL error where the scope is joined with the Participant model
    nearby_location_ids = Location.where.not(participant_id: nil)
      .near([@study.location.latitude, @study.location.longitude], 100)
      .to_a.pluck(:id)

    Participant.joins(:location)
      .where(location: { id: nearby_location_ids })
      .pluck(:id)
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

    @errors << 'Total sessions must be 1 or greater' if @study.total_sessions.to_i < 1
  end

  def validate_location
    if @study.location_type == Study::DIGITAL
      @study.update!(location: nil)
      return
    end

    if @study.location.nil?
      @errors << 'Location is required for hybrid or in-person studies'
      return
    end

    return if @study.location.complete?

    @errors << 'Location must include city, state, and country for hybrid or in-person studies'
  end

  def validate_timeline
    # Allow duration to be empty if total_sessions == 1
    return if @study.total_sessions == 1 || !@study.duration.empty?

    @errors << 'Study duration must be set if there are multiple sessions'
  end

  def validate_age_range
    return unless @study.min_age.present? && @study.max_age.present?

    return unless @study.min_age > @study.max_age && @study.max_age != 0

    @errors << 'Minimum age cannot be greater than maximum age'
  end
end
