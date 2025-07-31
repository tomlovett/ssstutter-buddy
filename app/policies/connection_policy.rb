# frozen_string_literal: true

class ConnectionPolicy < ApplicationPolicy
  def update?
    user.id == (user.participant? ? record.participant.user_id : record.researcher.user_id) || admin?
  end

  def destroy?
    false
  end
end
