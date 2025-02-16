# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users, except: :index, path: 'u'
  get '/u/:id/select_role', to: 'users#select_role'
  get '/u/:id/change_password', to: 'users#change_password'

  # Defines the root path route ("/")
  # root "articles#index"

  resources :participants, except: :index, path: 'p'
  get '/p/:id/home', to: 'participants#home'
  resources :researchers, except: :index, path: 'r'
  get '/r/:id/home', to: 'researchers#home'
  resources :studies, path: 's'
end
