# frozen_string_literal: true

class PublicController < ApplicationController
  skip_before_action :require_authentication

  def home
    render inertia: 'Public/home'
  end

  def faq
    render inertia: 'Public/FAQ'
  end

  def researchers
    render inertia: 'Public/researchers'
  end

  def participants
    render inertia: 'Public/participants'
  end
end
