# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users, except: :index
  get '/users/:id/select_role', to: 'users#select_role'
  get '/users/:id/change_password', to: 'users#change_password'

  # Defines the root path route ("/")
  # root "articles#index"

  resources :participants
  resources :researchers

  namespace 'p' do # Participants
  end

  namespace 'r' do # Researchers
  end
end
