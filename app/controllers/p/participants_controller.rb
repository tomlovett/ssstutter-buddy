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
  def show; end

  # GET /p/participants/new
  def new
    @participant = Participant.new
  end

  # GET /p/participants/1/edit
  def edit; end

  # POST /p/participants
  def create
    @participant = Participant.new(participant_params)

    if @participant.save
      redirect_to @participant, notice: t.success
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /p/participants/1
  def update
    if @participant.update(participant_params)
      redirect_to @participant, notice: 'Success!', status: :see_other
    else
      render :edit, status: :unprocessable_entity
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
