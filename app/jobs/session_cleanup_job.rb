# frozen_string_literal: true

class SessionCleanupJob < ApplicationJob
  queue_as :default

  def perform
    Rails.logger.info 'Starting session cleanup job'

    expired_count = Session.expired.count
    Session.expired.destroy_all

    Rails.logger.info "Session cleanup completed. Removed #{expired_count} expired sessions"
  end
end
