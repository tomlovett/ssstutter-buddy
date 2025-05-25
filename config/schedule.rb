# frozen_string_literal: true

# Use this file to easily define all of your cron jobs.
set :environment, Rails.env
set :output, 'log/whenever.log'

# Run the weekly online digest every Tuesday at 2am
every :tuesday, at: '2:00 am' do
  runner 'WeeklyOnlineDigestJob.perform_later'
end
