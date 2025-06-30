# frozen_string_literal: true

class AdminController < ApplicationController
  before_action :redirect_if_not_admin

  def stats
    users_count = User.count
    participants_count = Participant.count
    researchers_count = Researcher.count
    published_studies_count = Study.published.count
    active_connections_count = Connection.accepted.count
    completed_connections_count = Connection.completed.count
    digital_completed_connections_count = Connection.completed.joins(:study).where(study: { digital_only: true }).count
    digital_only_studies_count = Study.where(digital_only: true).count
    participants_by_country = Participant.where.not(country: nil).group(:country).count
    studies_by_country = Study.where.not(published_at: nil).where.not(country: nil).group(:country).count

    render inertia: 'admin/stats', props: {
      users_count:,
      participants_count:,
      researchers_count:,
      published_studies_count:,
      active_connections_count:,
      completed_connections_count:,
      digital_completed_connections_count:,
      digital_only_studies_count:,
      participants_by_country:,
      studies_by_country:
    }
  end

  private

  def redirect_if_not_admin
    return redirect_to login_url if Current.user.nil?

    redirect_to Current.user.home_page unless Current.user.admin?
  end
end
