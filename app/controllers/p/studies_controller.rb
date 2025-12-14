# frozen_string_literal: true

class P::StudiesController < P::BaseController
  before_action :set_study, only: %i[show]

  # GET /p/digital-studies
  def digital_studies
    existing_study_connections = if Current.user&.participant
                                   Current.user.participant.connections.pluck(:study_id)
                                 else
                                   []
                                 end

    untouched_digital_studies = Study.digital_friendly.active
      .where.not(id: existing_study_connections)
      .order(created_at: :desc).page(params[:page]).per(25)

    props = {
      studies: untouched_digital_studies,
      pagination: {
        current_page: untouched_digital_studies.current_page,
        total_pages: untouched_digital_studies.total_pages,
        total_count: untouched_digital_studies.total_count
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
