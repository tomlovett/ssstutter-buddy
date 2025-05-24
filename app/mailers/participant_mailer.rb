# frozen_string_literal: true

class ParticipantMailer < ApplicationMailer
  def new_study_alert
    @study = params[:study]
    @participant = params[:participant]
    @researcher = @study.researcher

    mail(to: @participant.email, subject: 'SSStutterBuddy: A new study for you!')
  end
end
