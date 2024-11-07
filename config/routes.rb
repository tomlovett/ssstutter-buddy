# frozen_string_literal: true

Rails.application.routes.draw do
  root "placeholder#landing"

  get '/faq', to: 'placeholder#faq'
  match '/*any', to: redirect('/'), via: :all
end
