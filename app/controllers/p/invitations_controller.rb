# frozen_string_literal: true

class P::InvitationsController < P::BaseController
  before_action :set_invitation, only: %i[create]

  # POST /p/invitations
  def create
    if @invitation.status == params[:status] && @invitation.status_explanation == params[:status_explanation]
      return reload_study
    end

    if ['declined', 'not interested'].include?(params[:status])
      @invitation.update(status: params[:status], status_explanation: params[:status_explanation])
      return reload_study
    end

    @invitation.update(status: params[:status], status_explanation: params[:status_explanation])

    connection = Connection.create(participant_id: params[:participant_id], study_id: params[:study_id])
    ConnectionMailer.with(connection:).new_connection.deliver_later

    reload_study
  end

  private

  def invitation_params
    params.permit(:participant_id, :study_id, :status, :status_explanation)
  end

  def set_invitation
    @invitation = Invitation.find_or_create_by(participant_id: params[:participant_id], study_id: params[:study_id])
  end

  def reload_study
    redirect_to "/p/studies/#{params[:study_id]}"
  end
end
