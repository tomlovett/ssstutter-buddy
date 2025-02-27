# frozen_string_literal: true

module ParticipantsHelper
  def display_name(participant)
    if participant.connected? && participant.responded?
      participant.name
    else
      participant.codename
    end
  end
end
