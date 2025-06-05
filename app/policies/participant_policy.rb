# frozen_string_literal: true

class ParticipantPolicy < ApplicationPolicy
  def view?
    owner? || researcher?
  end

  private

  # not sure
  def connected?
    user.researcher.connected_participant_ids.include?(record.id)
  end
end
