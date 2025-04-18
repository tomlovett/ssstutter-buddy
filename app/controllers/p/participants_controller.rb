# frozen_string_literal: true

class P::ParticipantsController < ApplicationController
  before_action :redirect_if_not_participant
  before_action :set_participant, only: %i[show edit update destroy]

  # GET /p
  def index
    @participant = Current.user.participant

    props = {
      participant: @participant.as_json(include: :user),
      study_invitations: @participant.study_invitations.as_json(include: :study),
      connections: @participant.connections.as_json(include: :study),
      nearby_studies: @participant.nearby_studies
    }

    render inertia: 'p/Participants/home', props:
  end

  # GET /p/participants/1
  def show
    return redirect_to '/p' unless allowed_to?(:show?, @participant)

    render inertia: 'p/Participants/show', props: { participant: @participant.as_json }
  end

  # GET /p/participants/new
  def new
    @participant = Participant.new(user: Current.user)

    render inertia: 'p/Participants/edit', props: { participant: @participant.as_json }
  end

  # GET /p/participants/1/edit
  def edit
    render inertia: 'p/Participants/edit', props: { participant: @participant.as_json }
  end

  # PATCH/PUT /p/participants/1
  def update
    if allowed_to?(:update?, @participant) && @participant.update(participant_params)
      head :ok
    else
      head :unprocessable_entity
    end
  end

  # DELETE /p/participants/1
  def destroy
    return head :unprocessable_entity unless allowed_to?(:destroy?, @participant)

    @participant.destroy
    redirect_to participants_url, notice: t.success, status: :see_other
  end

  private

  def redirect_if_unauthorized(action, redirect_path)
    redirect_to redirect_path unless allowed_to?(action, @participant)
  end

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
