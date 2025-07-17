# frozen_string_literal: true

class Participant < ApplicationRecord
  belongs_to :user
  has_many :connections, dependent: :nullify
  has_one :location, dependent: :destroy

  delegate :first_name, :last_name, :email, to: :user

  geocoded_by :address
  after_validation :geocode, if: ->(obj) { obj.city.present? && obj.city_changed? }

  def as_json(options = {})
    super.merge({ first_name:, last_name:, codename:, email:, location: location&.as_json })
  end

  def complete?
    location_complete? && [
      first_name,
      last_name,
      codename,
      email,
      birthdate,
      gender
    ].none?(&:nil?)
  end

  def location_complete?
    location.present? && location.city.present? && location.state.present? && location.country.present?
  end

  def address
    [city, state, country].compact.join(', ')
  end

  def nearby_studies
    return [] unless location_complete?

    Study.near([location.latitude, location.longitude], 100).order(published_at: :desc)
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
