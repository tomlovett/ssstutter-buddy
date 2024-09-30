# frozen_string_literal: true

module ResearchersHelper
  def from_current_user?(current_user, researcher)
    current_user&.id && current_user.id == researcher.user_id
  end
end
