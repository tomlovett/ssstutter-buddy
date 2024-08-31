# frozen_string_literal: true

class Researcher < ApplicationRecord
  belongs_to :user

  delegate :first_name, :last_name, :email, to: :user
end
