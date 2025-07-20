# frozen_string_literal: true

class Participant < ApplicationRecord
  belongs_to :user
  has_many :connections, dependent: :nullify
  has_one :location, dependent: :destroy

  accepts_nested_attributes_for :location, reject_if: :all_blank

  delegate :first_name, :last_name, :email, to: :user

  def as_json(options = {})
    super(options.merge(include: :location, methods: %i[first_name last_name email]))
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

    # `to_a` syntax prevents a SQL error where the scope is joined with the Study model
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
