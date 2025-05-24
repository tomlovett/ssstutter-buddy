# frozen_string_literal: true

class Researcher < ApplicationRecord
  belongs_to :user
  has_many :studies, dependent: nil
  has_many :connections, through: :studies

  has_one_attached :headshot

  delegate :first_name, :last_name, :full_name, :email, to: :user

  def as_json(options = {})
    headshot_url = if headshot.attached?
                     Rails.application.routes.url_helpers
                          .rails_blob_path(headshot, only_path: true)
                   end

    super.merge(
      {
        first_name:,
        last_name:,
        email:,
        professional_name:,
        headshot_url:
      }
    )
  end

  def complete?
    [
      first_name,
      last_name,
      email,
      institution,
      bio,
      research_interests,
      university_profile_url
    ].none?(&:nil?)
  end

  def professional_name
    titles.present? ? "#{full_name}, #{titles}" : full_name
  end

  def connected_participant_ids
    connections.not_rejected.pluck(:participant_id).uniq
  end

  def active_connections
    connections.where(study: studies).active
  end
end
