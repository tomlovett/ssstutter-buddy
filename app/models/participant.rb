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
end
