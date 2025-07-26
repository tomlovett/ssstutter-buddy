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
      total_connections: Connection.count,
      completed_connections_count: Connection.completed.count,
      digital_completed_connections_count: Connection.completed
                                                     .joins(:study)
                                                     .where(study: { location_type: Study::DIGITAL })
                                                     .count,
      digital_only_studies_count: Study.where(location_type: Study::DIGITAL).count,
      participants_by_country: Participant.joins(:location)
                                          .where.not(location: { country: nil })
                                          .group('location.country').count,
      studies_by_country: Study.joins(:location)
                               .where.not(published_at: nil)
                               .where.not(location: { country: nil })
                               .group('location.country').count
    }
  end
end
