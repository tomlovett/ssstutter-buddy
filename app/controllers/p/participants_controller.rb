# frozen_string_literal: true

class P::ParticipantsController < P::BaseController
  before_action :set_participant, only: %i[show edit update destroy]
  skip_before_action :redirect_if_not_complete, only: [:edit]

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
    return redirect_to '/p' unless allowed_to?(:view?, @participant)

    render inertia: 'p/Participants/show', props: { participant: @participant.as_json }
  end

  # GET /p/participants/1/edit
  def edit
    return redirect_to "/p/participants/#{@participant.id}" unless allowed_to?(:update?, @participant)

    props = { participant: @participant.as_json, is_complete: @participant.complete? }

    render inertia: 'p/Participants/edit', props:
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
