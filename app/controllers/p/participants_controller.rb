# frozen_string_literal: true

class P::ParticipantsController < ApplicationController
  before_action :set_participant, only: %i[show edit update destroy]

  # GET /p
  def index
    @participant = Participant.find(1)

    props = {
      participant: @participant.as_json(include: :user),
      study_invitations: @participant.study_invitations.as_json(include: :study),
      connections: @participant.connections.as_json(include: :study),
      nearby_studies: @participant.nearby_studies
    }

    render inertia: 'p/Participant/home', props:
  end

  # GET /p/participants/1
  def show
    render inertia: 'p/Participant/show', props: { participant: @participant.as_json }
  end

  # GET /p/participants/new
  def new
    @current_user = User.take

    @participant = Participant.new(user: @current_user)

    render inertia: 'p/Participant/edit', props: { participant: @participant.as_json }
  end

  # GET /p/participants/1/edit
  def edit
    render inertia: 'p/Participant/edit', props: { participant: @participant.as_json }
  end

  # PATCH/PUT /p/participants/1
  def update
    if @participant.update(participant_params)
      head :ok
    else
      head :unprocessable_entity
    end
  end

  # DELETE /p/participants/1
  def destroy
    @participant.destroy
    redirect_to participants_url, notice: t.success, status: :see_other
  end

  private

  def set_participant
    @participant = Participant.find(params[:id])
  end

  def participant_params
    params.fetch(:participant).permit(
      :codename,
      :birthdate,
      :gender,
      :handedness,
      :etiology,
      :default_reveal,
      :default_distance,
      :city,
      :state,
      :country
    )
  end
end
