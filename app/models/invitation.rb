# frozen_string_literal: true

class Invitation < ApplicationRecord
  belongs_to :participant
  belongs_to :study
  has_one :researcher, through: :study

  # Invitation statuses
  INVITED = 'invited' # auto-created when participant is near a newly-published study
  ACCEPTED = 'accepted' # accepts invitation to nearby study
  DECLINED = 'declined' # declines invtitation to nearby study
  INTERESTED = 'interested' # for study that is either digital or not-near hybrid
  NOT_INTERESTED = 'not interested' # for study that is either digital or not-near hybrid

  scope :invited, -> { where(status: INVITED) }
  scope :accepted, -> { where(status: [ACCEPTED, INTERESTED]) }
  scope :declined, -> { where(status: [DECLINED, NOT_INTERESTED]) }

  validates :status, inclusion: { in: [INVITED, ACCEPTED, DECLINED, INTERESTED, NOT_INTERESTED] }
  validates :participant_id, uniqueness: { scope: :study_id }

  def display_participant_name?
    (Current.user&.participant&.id == participant.id) || [ACCEPTED, INTERESTED].include?(status)
  end

  def as_json(options = {})
    attrs = attributes.dup

    if display_participant_name?
      attrs['name'] = "#{participant.first_name} #{participant.last_name}"
      attrs['email'] = participant.email
    else
      attrs['name'] = participant.codename
    end

    super.merge(attrs)
  end
end
