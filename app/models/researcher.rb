# frozen_string_literal: true

class Researcher < ApplicationRecord
  belongs_to :user
  has_many :studies, dependent: nil
  has_many :connections, dependent: nil

  delegate :first_name, :last_name, :full_name, :email, to: :user

  def to_json(*_args)
    attributes.merge({ first_name:, last_name:, email:, professional_name: })
  end

  def professional_name
    titles.present? ? "#{full_name}, #{titles}" : full_name
  end

  def active_connections
    Connection.where(study: studies).active
  end
end
