# frozen_string_literal: true

Rails.application.routes.draw do
  # Authentication routes
  get '/login', to: 'authentication#login'
  post '/auth/login', to: 'authentication#login_action'
  get '/auth/:provider/callback', to: 'omniauth_callbacks#google_oauth2'

  #  Routes for confirming email
  get '/confirm', to: 'authentication#confirm'
  post '/auth/confirm', to: 'authentication#confirm_action'

  #  Routes for forgot password
  get '/forgot-password', to: 'authentication#forgot_password'
  post '/auth/forgot-password', to: 'authentication#forgot_password_action'
  get '/reset-password', to: 'authentication#reset_password'

  resources :users, except: %i[index new create], path: 'u'
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/u/:id/select-role', to: 'users#select_role'
  post '/u/:id/select-role', to: 'users#select_role_action'

  namespace :p do
    get '/', to: '/p/participants#index'
    resources :connections, only: %i[index create update]
    resources :participants, except: %i[index create]

    resources :researchers, only: :show
    get '/studies/digital', to: 'studies#digital_studies'
    resources :studies, only: %i[index show]
  end

  namespace :r do
    get '/', to: '/r/researchers#home'
    resources :researchers, except: :index

    resources :studies
    resources :participants, only: [:show]
  end

  scope :api do
    post '/location', to: 'api#location'
  end
end
