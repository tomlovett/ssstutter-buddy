# frozen_string_literal: true

Rails.application.routes.draw do
  # Public routes
  get 'faq', to: 'public#faq'
  get 'researchers', to: 'public#researchers'
  get 'participants', to: 'public#participants'
  get '/', to: 'public#home'

  get '*path', to: redirect('/')
end
