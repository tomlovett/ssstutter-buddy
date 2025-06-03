# frozen_string_literal: true

# Use this file to easily define all of your cron jobs.

set :environment, Rails.env
set :output, 'log/whenever.log'

# Run the weekly online digest every Tuesday at 2am
every :tuesday, at: '11:00 am' do
  runner 'WeeklyOnlineDigestJob.perform_later'
end

# Run weekly stats job every Sunday at 9am
every :sunday, at: '9:00 am' do
  runner 'WeeklyStatsJob.perform_later'
end

# Run new researcher notification every day at 11pm
every :day, at: '11:00 pm' do
  runner 'NightlyNewResearcherJob.perform_later'
end
