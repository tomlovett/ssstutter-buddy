# frozen_string_literal: true

class Researcher < ApplicationRecord
  belongs_to :user
  has_many :studies, dependent: nil
  has_many :connections, through: :studies

  delegate :first_name, :last_name, :full_name, :email, to: :user

  def as_json(options = {})
    super.merge({ first_name:, last_name:, email:, professional_name: })
  end

  def professional_name
    titles.present? ? "#{full_name}, #{titles}" : full_name
  end

  def connected_participant_ids
    connections.not_rejected.pluck(:participant_id).uniq
  end

  def active_connections
    connections.where(study: studies).active
  end
end
