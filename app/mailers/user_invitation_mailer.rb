# frozen_string_literal: true

class UserInvitationMailer < ApplicationMailer
  def invitation_email
    @recipient = params[:recipient]
    @invited_by_name = params[:invited_by_name]
    @signup_url = Rails.root.join('/signup').to_s

    mail(
      to: @recipient,
      subject: 'You\'ve been invited to join SSStutterBuddy!'
    )
  end
end
