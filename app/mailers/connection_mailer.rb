# frozen_string_literal: true

class ConnectionMailer < ApplicationMailer
  def new_connection
    @connection = params[:connection]
    @study = @connection.study
    @participant = @connection.participant
    @researcher = @study.researcher

    @participant.user # Eager load the user to avoid N+1 queries
    @show_autosend_url = @study.autosend_url.present? &&
                         !(@study.autosend_verified_only && @participant.user.provisional?)

    mail(to: [@participant.email, @researcher.email], subject: "New connection - #{@study.title}")
  end
end
