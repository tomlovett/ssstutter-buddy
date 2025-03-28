# frozen_string_literal: true

Rails.application.routes.draw do
  post 'auth/login', to: 'authentication#login'
  post 'signup', to: 'registrations#create'
  get 'auth/:provider/callback', to: 'omniauth_callbacks#google_oauth2'

  resources :users, except: :index, path: 'u'
  get '/u/:id/select_role', to: 'users#select_role'
  get '/u/:id/change_password', to: 'users#change_password'

  # Defines the root path route ("/")
  # root "articles#index"

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
