# frozen_string_literal: true

class Participant < ApplicationRecord
  belongs_to :user

  delegate :first_name, :last_name, :email, to: :user
end
