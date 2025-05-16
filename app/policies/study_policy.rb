# frozen_string_literal: true

class StudyPolicy < ApplicationPolicy
  def owner?
    record.researcher == user.researcher
  end
end
