# frozen_string_literal: true

Rails.application.routes.draw do
  # inertia 'about' => 'Public/about'
  inertia 'faq' => 'Public/FAQ'
  inertia 'researchers' => 'Public/researchers'
  inertia 'participants' => 'Public/participants'

  inertia '/' => 'Public/home'

  get '*path', to: redirect('/')
end
