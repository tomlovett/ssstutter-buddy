class UserMailer < ApplicationMailer
   def confirmation_email
     @user = params[:user]
     @confirmation_link = params[:confirmation_link]

     mail(to: @user.email, subject: 'Confirm your SB email')
   end

   # divide for R and P
   def welcome_email
      # welcome email
   end
end
