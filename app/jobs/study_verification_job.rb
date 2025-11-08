# frozen_string_literal: true

class StudyVerificationJob < ApplicationJob
  queue_as :default

  def perform
    studies_to_check = Study.active.where(last_verified_active: ...30.days.ago)

    studies_to_check.find_each do |study|
      days_since_verification = ((Time.current - study.last_verified_active) / 1.day).to_i

      if days_since_verification >= 50
        study.update(closed_at: Time.current)
      elsif days_since_verification >= 40
        StudyMailer.with(study:, researcher: study.researcher).verify_active_final_warning.deliver_now
      elsif days_since_verification >= 30
        StudyMailer.with(study:, researcher: study.researcher).verify_active_warning.deliver_now
      end
    end
  end
end
