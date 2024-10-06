# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users, except: :index, path: 'u'
  get '/users/:id/select_role', to: 'users#select_role'
  get '/users/:id/change_password', to: 'users#change_password'

  # Defines the root path route ("/")
  # root "articles#index"

  resources :participants, except: :index, path: 'p'
  resources :researchers, except: :index, path: 'r'
  resources :studies, path: 's'
end
