# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/user_invitation_mailer
class UserInvitationMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/user_invitation_mailer/invitation_email
  def invitation_email
    UserInvitationMailer.with(
      recipient: 'friend@example.com',
      invited_by_name: 'John Doe'
    ).invitation_email
  end
end
