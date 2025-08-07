# frozen_string_literal: true

class Researcher < ApplicationRecord
  belongs_to :user
  has_many :studies, dependent: :destroy
  has_many :connections, through: :studies, dependent: :destroy
  has_many :invitations, through: :studies, dependent: :destroy

  has_one_attached :headshot

  delegate :first_name, :last_name, :full_name, :email, to: :user

  def as_json(options = {})
    headshot_url = if headshot.attached?
                     begin
                       Rails.application.routes.url_helpers.rails_blob_url(headshot)
                     rescue StandardError => e
                       Rails.logger.error "Failed to generate headshot URL: #{e.message}"
                       Rails.logger.error "Host config: #{Rails.application.routes.default_url_options}"
                       # Fall back to redirect URL if direct URL fails
                       begin
                         Rails.application.routes.url_helpers
                           .rails_blob_path(headshot, only_path: true)
                       rescue StandardError => e2
                         Rails.logger.error "Failed to generate fallback URL: #{e2.message}"
                         nil
                       end
                     end
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
    connections.pluck(:participant_id).uniq
  end
end
