# frozen_string_literal: true

class LocationPolicy < ApplicationPolicy
  def owner?
    return true if admin?

    if user.researcher?
      record&.study&.researcher == user.researcher
    else
      record&.participant&.user == user
    end
  end
end
