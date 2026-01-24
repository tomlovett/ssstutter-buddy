# frozen_string_literal: true

class P::StudiesController < P::BaseController
  before_action :set_study, only: %i[show]

  # GET /p/digital-studies
  def digital_studies
    all_studies = Study.digital_friendly.active
      .includes(:invitations, :connections, :location)
      .order(created_at: :desc)
      .page(params[:page])
      .per(25)

    props = {
      studies: all_studies,
      pagination: {
        current_page: all_studies.current_page,
        total_pages: all_studies.total_pages,
        total_count: all_studies.total_count
      }
    }

    render inertia: 'p/Studies/digital-studies', props:
  end

  # GET /p/studies/1
  def show
    invitation = nil
    connection = nil

    if Current.user&.participant
      invitation = Invitation.find_by(study: @study, participant: Current.user.participant)
      connection = Connection.find_by(study: @study, participant: Current.user.participant)
    end

    render inertia: 'p/Studies/show', props: {
      study: @study,
      researcher: @study.researcher.as_json,
      invitation:,
      connection:
    }
  end

  private

  def set_study
    @study = Study.find(params[:id])
  end
end
