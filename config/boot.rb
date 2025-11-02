# frozen_string_literal: true

ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.

# Load local environment overrides if file exists
env_file = File.expand_path('_env.rb', __dir__)
require env_file if File.exist?(env_file)
