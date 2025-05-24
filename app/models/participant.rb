# frozen_string_literal: true

class Participant < ApplicationRecord
  belongs_to :user
  has_many :connections, dependent: nil

  delegate :first_name, :last_name, :email, to: :user

  geocoded_by :address
  after_validation :geocode, if: ->(obj) { obj.city.present? && obj.city_changed? }

  def as_json(options = {})
    super.merge({ first_name:, last_name:, codename:, email:, badges: }).merge(VerifiedAddress.new(self).as_json)
  end

  def complete?
    [
      first_name,
      last_name,
      codename,
      email,
      city,
      state,
      country,
      birthdate,
      gender
    ].none?(&:nil?)
  end

  def address
    [city, state, country].compact.join(', ')
  end

  def nearby_studies
    Study.limit(3)
    # study where within distace_pref, no connection, active/not closed
  end

  def badges
    {
      # online: completed_studies.digital.count,
      # inperson: completed_studies.where(digital_friendly: false).count
    }
  end

  def study_invitations
    connections.invited
  end

  def completed_studies
    connections.completed
  end

  def potential_codenames
    CodenameGenerator.new.run
  end
end
