# frozen_string_literal: true

class AdminMailer < ApplicationMailer
  def weekly_stats
    @stats_data = params[:stats_data]
    @date = Time.current.strftime('%B %d, %Y')

    mail(
      to: ENV['ADMIN_EMAILS'].split(','),
      subject: "SSStutterBuddy Weekly Statistics - #{@date}"
    )
  end
end
