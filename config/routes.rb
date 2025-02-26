# frozen_string_literal: true

Rails.application.routes.draw do
  # Authentication routes (available in all environments)
  post 'auth/login', to: 'authentication#login'
  post 'signup', to: 'registrations#create'
  get 'auth/:provider/callback', to: 'omniauth_callbacks#google_oauth2'

  if Rails.env.production?
    root 'placeholder#landing'

    get '/faq', to: 'placeholder#faq'
    match '/*any', to: redirect('/'), via: :all
  else
    resources :users, except: :index, path: 'u'
    get '/u/:id/select_role', to: 'users#select_role'
    get '/u/:id/change_password', to: 'users#change_password'

    # Defines the root path route ("/")
    # root "articles#index"

    resources :participants, except: :index, path: 'p'
    resources :researchers, except: :index, path: 'r'
    resources :studies, path: 's'
  end
end
