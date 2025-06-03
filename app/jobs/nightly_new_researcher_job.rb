# frozen_string_literal: true

class NightlyNewResearcherJob < ApplicationJob
  queue_as :default

  def perform
    researchers = Researcher
                  .includes(:user)
                  .where(created_at: 24.hours.ago..)
                  .order(created_at: :desc)

    return if researchers.empty?

    AdminMailer.with(researchers:).new_researchers.deliver_later
  end
end
