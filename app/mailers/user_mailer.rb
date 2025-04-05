# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def confirmation_email
    @user = params[:user]
    @confirmation_url = Rails.root.join("u/confirm?pin=#{@user.activation_pin}").to_s

    mail(
      to: @user.email,
      subject: 'Confirm your SsstutterBuddy account'
    )
  end

  def password_reset_email
    @user = params[:user]
    @reset_url = Rails.root.join("reset-password?token=#{@user.activation_pin}").to_s

    mail(
      to: @user.email,
      subject: 'Reset your SsstutterBuddy password'
    )
  end
end
