# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password validations: false

  has_many :sessions, dependent: :destroy
  # User can be associated to a participant or researcher, but not both
  has_one :participant, required: false, dependent: :destroy
  has_one :researcher, required: false, dependent: :destroy

  validates :email, presence: true, uniqueness: true,
                    format: { with: URI::MailTo::EMAIL_REGEXP }
  normalizes :email, with: ->(e) { e.strip.downcase }
  validates :password, presence: true, length: { minimum: 8 }, if: :password_required?
  validates :first_name, presence: true
  validates :last_name, presence: true

  def as_json(options = {})
    super(options.merge(except: %i[password_digest activation_pin created_at updated_at]).merge(
      methods: [:home_page],
      include: %i[participant researcher]
    ))
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  def home_page
    return '/p/digital-studies' if provisional?

    return "/u/#{id}/select-role" if participant.blank? && researcher.blank?

    if participant.present?
      return participant.complete? ? '/p' : "/p/participants/#{participant.id}/edit"
    end

    return if researcher.blank?

    researcher.complete? ? '/r' : "/r/researchers/#{researcher.id}/edit"
  end

  def assign_activation_pin!
    update(activation_pin: PinGenerator.new.pin)
  end

  def researcher?
    researcher.present?
  end

  def participant?
    participant.present?
  end

  def admin?
    Rails.env.development? || ENV.fetch('ADMIN_EMAILS', '')
      .split(', ').include?(email) || email.include?('@tomlovett.com') || email.include?('@ssstutterbuddy.com')
  end

  def provisional?
    password.blank? && password_digest.blank?
  end

  def creating_provisional_user?
    !persisted? && provisional?
  end

  private

  def password_required?
    # For new records being created as provisional (no password_digest and no password provided)
    return false if creating_provisional_user?
    # For existing records, check if they're provisional
    return false if provisional?

    # Otherwise, require password for new records or when password is being set
    !persisted? || password.present?
  end
end
