# frozen_string_literal: true

# Preview all emails at http://localhost:3001/rails/mailers/connection_mailer
class ConnectionMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3001/rails/mailers/connection_mailer/new_connection
  def new_connection
    # Create a researcher with a user account
    researcher_user = FactoryBot.create(:user)
    researcher = FactoryBot.create(:researcher,
                                   user: researcher_user,
                                   institution: 'Boston University',
                                   titles: 'CCC-SLP')

    # Create a study
    study = FactoryBot.create(
      :study,
      researcher: researcher,
      title: 'Understanding Speech Patterns in Adults Who Stutter',
      short_desc: 'A comprehensive study examining speech patterns and communication strategies \
     in adults who stutter across different social contexts.',
      long_desc: 'This study aims to understand how adults who stutter adapt their communication strategies \
     in various social situations, including professional settings, casual conversations,\
       and public speaking scenarios.',
      methodologies: 'interview, survey',
      total_hours: 2,
      total_sessions: 1,
      duration: '2 weeks',
      remuneration: 50,
      digital_friendly: true,
      digital_only: false,
      city: 'Boston',
      state: 'MA',
      country: 'US',
      min_age: 18,
      max_age: nil
    )

    # Create a participant with a user account
    participant_user = FactoryBot.create(:user)
    participant = FactoryBot.create(
      :participant,
      user: participant_user,
      city: 'Cambridge',
      state: 'MA',
      country: 'US'
    )

    connection = FactoryBot.create(:connection, study:, participant:, researcher:)
    # Print debug info
    puts "Study: #{study.inspect}"
    puts "Participant: #{participant.inspect}"
    puts "Researcher: #{researcher.inspect}"

    ConnectionMailer.with(connection:).new_connection
  end
end
