# frozen_string_literal: true

class Connection < ApplicationRecord
  belongs_to :participant
  belongs_to :study

  scope :invited, -> { where.not(invited: nil) }
  scope :completed, -> { where(completed: true) }

  validates :pin, length: { is: 6 }

  before_validation { assign_pin! if pin.blank? }

  private

  def assign_pin!
    6.times { self.pin += Random.rand(0..9).to_s }
  end
end
