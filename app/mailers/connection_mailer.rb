# frozen_string_literal: true

class ConnectionMailer < ApplicationMailer
  def new_connection
    @connection = params[:connection]
    @study = @connection.study
    @participant = @connection.participant
    @researcher = @study.researcher

    subject = "StutterBuddy: New Study Connection - #{@study.title}"

    mail(to: [@participant.email, @researcher.email], subject:)
  end
end
