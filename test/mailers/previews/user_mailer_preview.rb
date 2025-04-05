# frozen_string_literal: true

# Preview all emails at http://localhost:3001/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3001/rails/mailers/user_mailer/confirmation_email
  def confirmation_email
    user = FactoryBot.create(:user)

    UserMailer.with(user:).confirmation_email
  end

  # Preview this email at http://localhost:3001/rails/mailers/user_mailer/password_reset_email
  def password_reset_email
    user = FactoryBot.create(:user)

    UserMailer.with(user:).password_reset_email
  end
end
