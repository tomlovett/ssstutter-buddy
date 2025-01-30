# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'
require 'sprockets/railtie'
require 'action_view/railtie'

Bundler.require(*Rails.groups)

module SsstutterBuddy
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    config.time_zone = 'Eastern Time (US & Canada)'
    # config.eager_load_paths << Rails.root.join("extras")

    config.action_mailer.default_url_options = { host: "ssstutterbuddy.com" }

    config.middleware.use ActionDispatch::Flash
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
  end
end
