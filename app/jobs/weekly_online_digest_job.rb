# frozen_string_literal: true

class WeeklyOnlineDigestJob < ApplicationJob
  queue_as :default

  def perform
    studies = Study.where(digital_friendly: true, published: true)
      .where('published_at > ?', 1.week.ago)
      .order(published_at: :asc)

    participants = Participant.where(email_digest_opt_out: false)

    participants.each do |participant|
      ParticipantMailer.with(participant:, studies:).weekly_online_digest.deliver_later
    end
  end
end
