# frozen_string_literal: true

class Participant < ApplicationRecord
  belongs_to :user
  has_many :study_participations, dependent: nil

  delegate :first_name, :last_name, :email, to: :user

  geocoded_by :address
  after_validation :geocode if Rails.env.production?

  def address
    [city, state, country].compact.join(', ')
  end

  def study_invitations
    study_participations.invited
  end

  def completed_studies
    study_participations.completed
  end

  def potential_codenames
    CodenameGenerator.new.run
  end
end
