# frozen_string_literal: true

class ParticipantPolicy < ApplicationPolicy
  def view?
    owner? || researcher?
  end

  private

  def connected?
    user.researcher.connected_participant_ids.include?(record.id)
  end
end
