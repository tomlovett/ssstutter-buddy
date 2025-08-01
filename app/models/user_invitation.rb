# frozen_string_literal: true

class UserInvitation < ApplicationRecord
  validates :email, presence: true, uniqueness: true,
                    format: { with: URI::MailTo::EMAIL_REGEXP }
  normalizes :email, with: ->(e) { e.strip.downcase }
  validates :invited_by_id, presence: true

  scope :pending, -> { where(accepted_at: nil) }
end
