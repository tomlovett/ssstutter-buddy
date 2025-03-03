# frozen_string_literal: true

class P::StudiesController < ApplicationController
  before_action :set_study, only: %i[show]

  # GET /p/studies
  def index
    @studies = Study.all
  end

  def digital_studies
    existing_study_connections = Connection.where(participant: @participant).pluck(:study_id)
    untouched_digital_studies = Study.digital.where.not(id: existing_study_connections)

    props = {
      studies: untouched_digital_studies.order(:created_at)
    }

    render inertia: 'Participant/digitalStudies', props:
  end

  # GET /p/studies/1
  def show
    render inertia: 'p/Study/show', props: {
      study: @study,
      researcher: @study.researcher.to_participant_json,
      connection: Connection.find_by(study: @study, participant: @current_user&.participant)
    }
  end

  private

  def set_study
    @study = Study.find(params[:id])
  end
end
