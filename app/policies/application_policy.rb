# frozen_string_literal: true

class ApplicationPolicy < ActionPolicy::Base
  # Configure additional authorization contexts here
  # (`user` is added by default).
  #
  #   authorize :account, optional: true
  #
  # Read more about authorization context: https://actionpolicy.evilmartians.io/#/authorization_context

  def view?
    true
  end

  def update?
    owner?
  end

  def destroy?
    owner?
  end

  def owner?
    record.user_id == user.id || record.id == user.id
  end

  private

  def researcher?
    user.researcher?
  end

  def participant?
    user.participant?
  end
end
