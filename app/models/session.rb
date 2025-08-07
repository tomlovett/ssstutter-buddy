# frozen_string_literal: true

class Session < ApplicationRecord
  belongs_to :user

  scope :expired, -> { where(created_at: ...30.days.ago) }
  scope :active, -> { where('created_at > ?', 30.days.ago) }

  def expired?
    created_at < 30.days.ago
  end
end
