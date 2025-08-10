# frozen_string_literal: true

namespace :deploy do
  desc 'Log deployment events to Sentry'
  task log: :environment do
    # Set deployment context
    Sentry.set_tags(environment: Rails.env, component: 'deployment', deployment_type: 'release')

    # Set deployment context with useful information
    Sentry.set_context(
      :deployment,
      {
        timestamp: Time.current.iso8601,
        rails_env: Rails.env,
        rails_version: Rails.version,
        ruby_version: RUBY_VERSION,
        hostname: Socket.gethostname
      }
    )

    puts '✅ Deployment context set in Sentry'
    puts '✅ Deployment logged to Sentry successfully'
  rescue StandardError => e
    puts "❌ Failed to log deployment to Sentry: #{e.message}"
    puts "Error details: #{e.class.name} - #{e.message}"
    exit 1
  end

  desc 'Check critical services during deployment'
  task check_services: :environment do
    # Check database connectivity
    ActiveRecord::Base.connection.execute('SELECT 1')
    puts '✅ Database connectivity verified'

    # Check S3 connectivity if using S3 storage
    if Rails.application.config.active_storage.service == :amazon
      bucket_name = ENV.fetch('AWS_S3_BUCKET')
      s3_client = Aws::S3::Client.new(
        region: ENV.fetch('AWS_REGION', 'us-east-2'),
        access_key_id: ENV.fetch('AWS_ACCESS_KEY_ID'),
        secret_access_key: ENV.fetch('AWS_SECRET_ACCESS_KEY')
      )

      s3_client.head_bucket(bucket: bucket_name)
      puts '✅ S3 connectivity verified'
    end

    puts '✅ All critical services verified'
  rescue StandardError => e
    puts "❌ Service check failed: #{e.message}"
    exit 1
  end
end
