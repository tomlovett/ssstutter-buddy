# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  has_one :researcher, required: false, dependent: :destroy
  has_one :participant, required: false, dependent: :destroy

  before_save :format_last_initial!

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def format_last_initial!
    self.last_name = "#{last_name}." if last_name.length == 1
  end
end
