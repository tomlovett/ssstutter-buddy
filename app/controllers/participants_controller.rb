# frozen_string_literal: true

class ParticipantsController < ApplicationController
  before_action :set_participant, only: %i[show edit update destroy]

  # GET /participants/1
  def show; end

  # GET /participants/new
  def new
    @participant = Participant.new
  end

  # GET /participants/1/edit
  def edit; end

  # POST /participants
  def create
    @participant = Participant.new(participant_params)

    if @participant.save
      redirect_to @participant, notice: t.success
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /participants/1
  def update
    if @participant.update(participant_params)
      redirect_to @participant, notice: 'Success!', status: :see_other
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /participants/1
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
