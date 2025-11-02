# frozen_string_literal: true

class EmailHealthCheckJob < ApplicationJob
  queue_as :default

  def perform
    AdminMailer.with({}).email_health_check.deliver_now
  end
end

