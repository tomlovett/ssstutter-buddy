# frozen_string_literal: true

class WeeklyStatsJob < ApplicationJob
  queue_as :default

  def perform
    stats_data = collect_stats
    AdminMailer.with(stats_data:).weekly_stats.deliver_later
  end

  private

  def collect_stats
    {
      users_count: User.count,
      participants_count: Participant.count,
      researchers_count: Researcher.count,
      new_participants_count: Participant.where(created_at: 1.week.ago..).count,
      new_researchers_count: Researcher.where(created_at: 1.week.ago..).count,
      published_studies_count: Study.published.count,
      new_published_studies_count: Study.where(published_at: 1.week.ago..).count,
      active_connections_count: Connection.accepted.count,
      completed_connections_count: Connection.completed.count,
      digital_completed_connections_count: Connection.completed
                                                     .joins(:study).where(study: { digital_only: true }).count,
      digital_only_studies_count: Study.where(digital_only: true).count,
      participants_by_country: Participant.where.not(country: nil).group(:country).count,
      studies_by_country: Study.where.not(published_at: nil).where.not(country: nil).group(:country).count
    }
  end
end
