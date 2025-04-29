# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  has_many :sessions, dependent: :destroy
  has_one :participant, required: false, dependent: :destroy
  has_one :researcher, required: false, dependent: :destroy

  validates :email, presence: true
  normalizes :email_address, with: ->(e) { e.strip.downcase }
  validates :password, presence: true, length: { minimum: 8 }, if: :password_required?
  validates :first_name, presence: true
  validates :last_name, presence: true

  after_initialize { assign_activation_pin! }

  def as_json(options = {})
    super(options.merge(except: %i[password_digest activation_pin created_at updated_at]).merge(
      methods: [:home_page],
      include: %i[participant researcher]
    ))
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def self.from_omniauth(auth)
    find_or_create_by(email: auth.info.email) do |user|
      user.email = auth.info.email
      user.password = SecureRandom.hex(15)
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.confirmed_at = Time.zone.now
    end
  end

  def home_page
    return '/p' if participant.present?
    return '/r' if researcher.present?

    "/u/#{id}/select-role"
  end

  def assign_activation_pin!
    self.activation_pin = PinGenerator.new.pin
  end

  def researcher?
    researcher.present?
  end

  def participant?
    participant.present?
  end

  private

  def password_required?
    !persisted? || password.present?
  end
end
