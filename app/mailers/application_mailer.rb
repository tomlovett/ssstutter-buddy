# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'no-reply@ssstutterbuddy.com'
  layout 'mailer'
end
