# frozen_string_literal: true

class AdminController < ApplicationController
  before_action :redirect_if_not_admin

  def stats
    users_count = User.count
    participants_count = Participant.count
    researchers_count = Researcher.count
    published_studies_count = Study.published.count
    total_connections = Connection.count
    completed_connections_count = Connection.completed.count
    digital_completed_connections_count = Connection.completed.joins(:study)
      .where(study: { location_type: Study::DIGITAL }).count
    digital_only_studies_count = Study.where(location_type: Study::DIGITAL).count
    participants_by_country = Participant.joins(:location).where.not(locations: { country: nil })
      .group('locations.country').count
    studies_by_country = Study.joins(:location).where.not(published_at: nil).where.not(locations: { country: nil })
      .group('locations.country').count

    render inertia: 'admin/stats', props: {
      users_count:,
      participants_count:,
      researchers_count:,
      published_studies_count:,
      total_connections:,
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
