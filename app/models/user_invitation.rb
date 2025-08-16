# frozen_string_literal: true

class UserInvitation < ApplicationRecord
  normalizes :email, with: ->(e) { e.strip.downcase }
  validates :email, presence: true, uniqueness: true,
                    format: { with: URI::MailTo::EMAIL_REGEXP }
  validate :email_does_not_belong_to_existing_user, on: :create
  validates :invited_by_id, presence: true

  scope :pending, -> { where(accepted_at: nil) }

  private

  def email_does_not_belong_to_existing_user
    return if email.blank?

    errors.add(:email, 'belongs to an existing user') if User.exists?(email:)
  end
end
