# frozen_string_literal: true

module Admin
  module_function

  def users
    User.pluck(:email).join(', ')
  end

  def participants
    User.joins(:participant).pluck(:email).join(', ')
  end

  def researchers
    User.joins(:researcher).pluck(:email).join(', ')
  end
end
