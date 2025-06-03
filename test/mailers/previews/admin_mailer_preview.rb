# frozen_string_literal: true

class AdminMailerPreview < ActionMailer::Preview
  def weekly_stats
    # http://localhost:3001/rails/mailers/admin_mailer/weekly_stats
    # Sample data that mimics the structure of real stats
    stats_data = {
      users_count: 150,
      participants_count: 120,
      new_participants_count: 5,
      researchers_count: 30,
      new_researchers_count: 2,
      published_studies_count: 25,
      active_connections_count: 45,
      completed_connections_count: 75,
      digital_completed_connections_count: 30,
      digital_only_studies_count: 10,
      participants_by_country: {
        'United States' => 80,
        'Canada' => 20,
        'United Kingdom' => 15,
        'Australia' => 5
      },
      studies_by_country: {
        'United States' => 15,
        'Canada' => 5,
        'United Kingdom' => 3,
        'Australia' => 2
      }
    }

    AdminMailer.with(stats_data:).weekly_stats
  end
end
