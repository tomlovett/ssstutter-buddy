# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  has_one :participant
  has_one :researcher

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }, if: :password_required?
  validates :first_name, presence: true
  validates :last_name, presence: true

  def full_name
    "#{first_name} #{last_name}"
  end

  def self.from_omniauth(auth)
    where(email: auth.info.email).first_or_create do |user|
      user.email = auth.info.email
      user.password = SecureRandom.hex(15)
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
    end
  end

  private

  def password_required?
    !persisted? || password.present?
  end
end
