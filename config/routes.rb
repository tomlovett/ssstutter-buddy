# frozen_string_literal: true

Rails.application.routes.draw do
  # Public routes
  get 'faq', to: 'public#faq'
  get 'researchers', to: 'public#researchers'
  get 'participants', to: 'public#participants'
  get '/', to: 'public#home'

  # Authentication routes
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  # get '/auth/:provider/callback', to: 'omniauth_callbacks#google_oauth2'

  # Signup flow
  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'
  get '/u/:id/select-role', to: 'users#select_role'
  post '/u/:id/select-role', to: 'users#select_role_action'

  #  Routes for confirming
  get '/await-confirmation', to: 'authentication#await_confirmation'
  get '/await-confirmation/resend-confirmation', to: 'authentication#resend_confirmation'
  get '/confirm', to: 'authentication#confirm'

  #  Routes for forgot password
  get '/forgot-password', to: 'authentication#forgot_password'
  post '/forgot-password', to: 'authentication#forgot_password_action'
  get '/reset-password', to: 'authentication#reset_password', param: :activation_pin

  resources :users, except: %i[index new create], path: 'u'
  get '/change-password', to: 'authentication#change_password'
  put '/change-password', to: 'authentication#change_password_action'

  # Admin routes
  get 'admin/stats', to: 'admin#stats'

  namespace :p do
    get '/', to: '/p/participants#index'
    resources :connections, only: %i[index create update]
    resources :participants, except: %i[index create]

    resources :researchers, only: :show
    get '/digital-studies', to: 'studies#digital_studies'
    resources :studies, only: %i[index show]
  end

  namespace :r do
    get '/', to: '/r/researchers#home'
    resources :researchers, except: :index

    resources :studies do
      member do
        post 'publish'
      end
      collection do
        get 'closed'
      end
    end
    resources :participants, only: [:show]
  end

  scope :api do
    post '/location', to: 'api#location'
  end
  # end
end
