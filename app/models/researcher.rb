# frozen_string_literal: true

class Researcher < ApplicationRecord
  belongs_to :user
  has_many :studies, dependent: :destroy
  has_many :connections, through: :studies, dependent: :destroy
  has_many :invitations, through: :studies, dependent: :destroy

  has_one_attached :headshot

  delegate :first_name, :last_name, :full_name, :email, to: :user

  after_save :log_headshot_errors, if: :saved_change_to_headshot_attachment?

  private

  def log_headshot_errors
    return unless headshot.attached?

    if headshot.blob&.errors&.any?
      Sentry.capture_message(
        'Headshot attachment validation errors',
        tags: {
          component: 'researcher_headshot_validation',
          researcher_id: id,
          user_id: user_id
        },
        extra: {
          headshot_blob_id: headshot.blob&.id,
          validation_errors: headshot.blob.errors.full_messages,
          content_type: headshot.content_type,
          file_size: headshot.size
        }
      )
    end
  rescue StandardError => e
    Sentry.capture_exception(
      e,
      tags: {
        component: 'researcher_headshot_error_logging',
        researcher_id: id,
        user_id: user_id
      }
    )
  end

  def as_json(options = {})
    headshot_url = safe_headshot_url

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

  def safe_headshot_url
    return nil unless headshot.attached?

    begin
      Rails.application.routes.url_helpers.rails_blob_url(headshot)
    rescue StandardError => e
      Sentry.capture_exception(
        e,
        tags: {
          component: 'researcher_safe_headshot_url',
          researcher_id: id,
          user_id: user_id,
          storage_service: ActiveStorage::Blob.service_name
        },
        extra: {
          headshot_blob_id: headshot.blob&.id,
          headshot_blob_key: headshot.blob&.key,
          host_config: Rails.application.routes.default_url_options,
          error_message: e.message,
          error_class: e.class.name
        }
      )

      nil
    end
  end

  def professional_name
    titles.present? ? "#{full_name}, #{titles}" : full_name
  end

  def connected_participant_ids
    connections.pluck(:participant_id).uniq
  end
end
