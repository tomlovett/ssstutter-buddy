# frozen_string_literal: true

# Preview all emails at http://localhost:3001/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3001/rails/mailers/user_mailer/confirmation_email
  def confirmation_email
    user = FactoryBot.create(:user)

    UserMailer.with(user:).confirmation_email
  end

  # Preview this email at http://localhost:3001/rails/mailers/user_mailer/forgot_password_email
  def forgot_password_email
    user = FactoryBot.create(:user)

    UserMailer.with(user:).forgot_password_email
  end
end
