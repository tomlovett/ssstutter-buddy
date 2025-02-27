# frozen_string_literal: true

class Connection < ApplicationRecord
  belongs_to :participant
  belongs_to :study

  scope :invited, -> { where.not(invited: nil) }
  scope :completed, -> { where(completed: true) }
  scope :active, -> { where(invitation_response: 'accepted', completed: false) }

  validates :pin, length: { is: 6 }

  before_validation { assign_pin! if pin.blank? }

  private

  def assign_pin!
    self.pin = PinGenerator.new.pin
  end
end
