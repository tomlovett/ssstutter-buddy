# frozen_string_literal: true

class StudyMailer < ApplicationMailer
  def verify_active_warning
    @study = params[:study]
    @researcher = params[:researcher]
    @verify_active_token = generate_token(@study, 'verify_active')
    @mark_inactive_token = generate_token(@study, 'mark_inactive')
    @auto_close_date = (@study.last_verified_active + 50.days).strftime('%B %d, %Y')

    mail(to: @researcher.email, subject: 'Is your study still accepting participants?')
  end

  def verify_active_final_warning
    @study = params[:study]
    @researcher = params[:researcher]
    @verify_active_token = generate_token(@study, 'verify_active')
    @mark_inactive_token = generate_token(@study, 'mark_inactive')
    @auto_close_date = (@study.last_verified_active + 50.days).strftime('%B %d, %Y')

    mail(to: @researcher.email, subject: 'Warning: Verify your study\'s status or it will be CLOSED')
  end

  private

  def generate_token(study, action)
    verifier = Rails.application.message_verifier('study_verification')
    verifier.generate({ study_id: study.id, action: }, expires_in: 1.week)
  end
end
