# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  has_one :researcher, required: false, dependent: :destroy
  has_one :participant, required: false, dependent: :destroy

  def full_name
    "#{first_name} #{last_name}"
  end
end
