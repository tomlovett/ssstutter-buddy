# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SsstutterBuddy
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Admin module used in Rails console
    require_relative '../lib/admin'

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    config.time_zone = 'Eastern Time (US & Canada)'
    config.active_support.to_time_preserves_timezone = :zone
    # config.eager_load_paths << Rails.root.join("extras")

    config.action_mailer.default_url_options = { host: 'ssstutterbuddy.com' }

    # Set default URL options for routes (used by Active Storage)
    config.default_url_options = { host: 'ssstutterbuddy.com' }

    # Ensure routes have default URL options
    initializer 'set_default_url_options' do
      Rails.application.routes.default_url_options = { host: 'ssstutterbuddy.com' }
    end
  end
end
