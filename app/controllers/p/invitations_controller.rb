# frozen_string_literal: true

class P::InvitationsController < P::BaseController
  before_action :set_study_user_invitation, only: %i[create]

  # POST /p/invitations
  def create
    # Prompt existing users to login and retry
    return head :unauthorized if unauthd_full_user_without_session_tries_create_invitation

    # Silently pass through any existing invitation with the same status
    return success_response if @invitation&.status == params[:status]

    create_provisional_user_with_participant if params[:anonymous] && @user.blank?
    @user.participant.update(weekly_digest_opt_out: !params[:send_new_studies_emails]) if @user.provisional?

    @invitation = Invitation.create!(participant: @user.participant, study: @study) if @invitation.blank?

    if [Invitation::DECLINED, Invitation::NOT_INTERESTED].include?(params[:status])
      @invitation.update(status: params[:status], status_explanation: params[:status_explanation])
      return success_response
    end

    @invitation.update(status: params[:status], status_explanation: params[:status_explanation])

    if params[:status] == Invitation::INTERESTED
      connection = Connection.create(participant: @user.participant, study: @study)
      ConnectionMailer.with(connection:).new_connection.deliver_later
    end

    success_response
  end

  private

  def invitation_params
    params.permit(
      :study_id,
      :status,
      :status_explanation,
      :anonymous,
      :first_name,
      :last_name,
      :email,
      :send_new_studies_emails
    )
  end

  def provisional_user_params
    params.permit(
      :first_name,
      :last_name,
      :email
    )
  end

  def set_study_user_invitation
    @study = Study.find_by(id: params[:study_id])
    @user = Current.user || User.find_by(email: params[:email])

    @invitation = Invitation.find_by(participant: @user&.participant, study: @study)
  end

  def unauthd_full_user_without_session_tries_create_invitation
    Current.user.nil? && params[:anonymous] && @user.present? && !@user.provisional? && @invitation.blank?
  end

  def create_provisional_user_with_participant
    @user = User.create(provisional_user_params)
    return head :unprocessable_entity unless @user.persisted?

    weekly_digest_opt_out = !params[:send_new_studies_emails]
    Participant.create!(user: @user, weekly_digest_opt_out:)
  end

  def success_response
    head :ok, notice: 'Success!'
  end
end
