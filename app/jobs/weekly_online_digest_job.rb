# frozen_string_literal: true

class WeeklyOnlineDigestJob < ApplicationJob
  queue_as :default

  def perform
    active_digital_studies = Study.digital_friendly.active
      .where('published_at > ?', 1.week.ago)
      .order(published_at: :asc)

    Participant.where(weekly_digest_opt_out: false).find_each do |participant|
      connected_study_ids = participant.connections.pluck(:study_id)
      studies = active_digital_studies.where.not(id: connected_study_ids)

      ParticipantMailer.with(participant:, studies:).weekly_online_digest.deliver_now if studies.any?
    end
  end
end
