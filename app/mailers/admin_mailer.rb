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

  def new_researchers
    @researchers = params[:researchers]
    @date = Time.current.strftime('%B %d, %Y')
    @count = @researchers.count

    mail(
      #   to: ENV['ADMIN_EMAILS'].split(','),
      to: 'gma.dsf.om@gmail.com',
      subject: "SB: #{@count} New Researcher#{'s' unless @count == 1} - #{@date}"
    )
  end
end
