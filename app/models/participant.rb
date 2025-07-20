# frozen_string_literal: true

class Participant < ApplicationRecord
  belongs_to :user
  has_many :connections, dependent: :nullify
  has_one :location, dependent: :destroy

  accepts_nested_attributes_for :location, reject_if: :all_blank

  delegate :first_name, :last_name, :email, to: :user

  geocoded_by :address
  after_validation :geocode, if: ->(obj) { obj.city.present? && obj.city_changed? }

  def as_json(options = {})
    super.merge({ first_name:, last_name:, codename:, email:, location: location&.as_json })
  end

  def complete?
    location.present? && location.complete? && [
      first_name,
      last_name,
      codename,
      email,
      birthdate,
      gender
    ].none?(&:nil?)
  end

  def nearby_studies
    return [] unless location&.complete?

    # to_a syntax prevents an error when the scope is joined with the Study model
    # which makes the query unable to find a "distance" column
    nearby_locations = Location.has_study.near([location.latitude, location.longitude], 100).to_a.pluck(:id)

    Study.active.includes(:location).where(location: { id: nearby_locations }).order(published_at: :desc)
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
