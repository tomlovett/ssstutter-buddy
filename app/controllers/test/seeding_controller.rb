# frozen_string_literal: true

class Test::SeedingController < ApplicationController
  skip_forgery_protection
  skip_before_action :require_authentication
  before_action :ensure_test_environment

  E2E_EMAIL_PREFIX = 'e2e_1658498146584'
  PASSWORD = 'password123'

  attr_accessor :participant, :researcher, :admin, :studies

  def seed
    create_test_data

    render json: {
      participant: @participant.as_json,
      researcher: @researcher.as_json,
      admin_user: @admin.as_json,
      studies: @studies.map(&:as_json)
    }, status: :ok
  rescue StandardError => e
    render json: { message: 'Seed controller failed', error: e.message }, status: :internal_server_error
  end

  def cleanup
    cleanup_test_data

    render json: { message: 'Test data cleaned up successfully' }, status: :ok
  rescue StandardError => e
    render json: { message: "Cleanup controller failed: #{e.message}" }, status: :internal_server_error
  end

  private

  def ensure_test_environment
    return if Rails.env.local?

    render json: { error: 'Not available in production' }, status: :forbidden
  end

  def create_test_data
    # Create participant user
    participant_user = FactoryBot.create(
      :user,
      first_name: 'Test',
      last_name: 'Participant',
      email: "#{E2E_EMAIL_PREFIX}_#{Faker::Internet.email}",
      password: PASSWORD,
      password_confirmation: PASSWORD
    )

    # Create participant with location
    @participant = FactoryBot.create(
      :participant,
      user: participant_user,
      codename: 'TestParticipant',
      birthdate: '1990-01-01',
      gender: 'm'
    )

    # Create researcher user
    researcher_user = FactoryBot.create(
      :user,
      first_name: 'Dr. Test',
      last_name: 'Researcher',
      email: "#{E2E_EMAIL_PREFIX}_#{Faker::Internet.email}",
      password: PASSWORD,
      password_confirmation: PASSWORD
    )

    # Create researcher
    @researcher = FactoryBot.create(
      :researcher,
      user: researcher_user,
      institution: 'Test University',
      research_interests: 'Stuttering research',
      titles: 'PhD, CCC, SLP'
    )

    # Create admin user
    @admin = FactoryBot.create(
      :user,
      first_name: 'Admin',
      last_name: 'User',
      email: "#{E2E_EMAIL_PREFIX}_#{Faker::Internet.email}",
      password: PASSWORD,
      password_confirmation: PASSWORD
    )

    @studies ||= []

    # Create digital study (active)
    @studies << FactoryBot.create(
      :study,
      :active,
      :digital,
      researcher: @researcher,
      title: 'Digital Survey Study',
      short_desc: 'An online survey study about stuttering',
      long_desc: 'This is a comprehensive online survey study that explores various aspects of stuttering. ' \
                 'Participants will complete questionnaires and provide feedback about their experiences.',
      methodologies: 'survey',
      min_age: 18,
      max_age: 65,
      total_hours: 2,
      total_sessions: 1,
      duration: '2 hours',
      remuneration: '$50'
    )

    FactoryBot.create(:connection, :in_progress, study: Study.last, participant: @participant)

    # Create in-person study (active)
    @studies << FactoryBot.create(
      :study,
      :active,
      :in_person,
      researcher: @researcher,
      title: 'In-Person Interview Study',
      short_desc: 'An in-person interview study about stuttering',
      long_desc: 'This study involves in-person interviews to understand the experiences of people who stutter. ' \
                 'Participants will be interviewed at our research facility.',
      methodologies: 'interview',
      min_age: 21,
      max_age: 70,
      total_hours: 4,
      total_sessions: 2,
      duration: '2 weeks',
      remuneration: '$100'
    )

    # Create draft study
    @studies << FactoryBot.create(
      :study,
      :draft,
      researcher: @researcher,
      title: 'Draft Study',
      short_desc: 'A draft study that is not yet published',
      long_desc: 'This is a draft study that is still being developed and has not been published yet.',
      methodologies: 'survey,interview',
      min_age: 18,
      max_age: 80,
      total_hours: 3,
      total_sessions: 1,
      duration: '1 week',
      remuneration: '$75',
      location_type: 'hybrid'
    )

    # Create paused study
    @studies << FactoryBot.create(
      :study,
      :paused,
      :in_person,
      researcher: @researcher,
      title: 'Paused Study',
      short_desc: 'A study that has been paused',
      long_desc: 'This study has been temporarily paused and is not currently accepting participants.',
      methodologies: 'task performance',
      min_age: 18,
      max_age: 65,
      total_hours: 5,
      total_sessions: 3,
      duration: '1 month',
      remuneration: '$150'
    )
  end

  def cleanup_test_data
    # Dependent: :destroy relationships should cascade through all associated records
    User.where('email LIKE ?', "#{E2E_EMAIL_PREFIX}%").destroy_all
  end
end
