# frozen_string_literal: true

class UserInvitationsController < ApplicationController
  def index
    render inertia: 'invite', props: { user: Current.user }
  end

  def create
    return head :unprocessable_entity unless params[:email]&.match?(URI::MailTo::EMAIL_REGEXP)

    return head :ok if UserInvitation.exists?(email: params[:email]) || User.exists?(email: params[:email])

    @user_invitation = UserInvitation.new(user_invitation_params.merge(invited_by_id: Current.user.id))

    if @user_invitation.save
      UserInvitationMailer.with(
        recipient: @user_invitation.email,
        invited_by_name: Current.user.full_name
      ).invitation_email.deliver_later
    end

    head :ok
  end

  private

  def user_invitation_params
    params.permit(:email)
  end
end
