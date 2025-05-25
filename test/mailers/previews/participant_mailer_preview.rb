# frozen_string_literal: true

# Preview all emails at http://localhost:3001/rails/mailers/participant_mailer
class ParticipantMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3001/rails/mailers/participant_mailer/new_study_alert
  def new_study_alert
    study = FactoryBot.create(
      :study,
      title: 'Understanding Speech Patterns in Adults',
      short_desc: 'A study examining speech patterns and communication strategies in \
                              adults who stutter.',
      long_desc: 'This study aims to understand how adults who stutter adapt their \
                              communication strategies in different social situations.',
      methodologies: 'interview,survey',
      total_hours: 2,
      total_sessions: 1,
      duration: '2 weeks',
      remuneration: 50,
      digital_friendly: true,
      digital_only: false,
      city: 'Boston',
      state: 'MA',
      country: 'US'
    )

    participant = FactoryBot.create(
      :participant,
      user: FactoryBot.create(:user, first_name: 'John', last_name: 'Doe'),
      city: 'Cambridge',
      state: 'MA',
      country: 'US'
    )

    puts "study: #{study.inspect}"
    puts "participant: #{participant.inspect}"

    ParticipantMailer.with(study: study, participant: participant).new_study_alert
  end

  # Preview this email at http://localhost:3001/rails/mailers/participant_mailer/weekly_online_digest
  def weekly_online_digest
    # Create a researcher with a user account
    researcher_user = FactoryBot.create(:user)
    researcher = FactoryBot.create(
      :researcher,
      user: researcher_user,
      institution: 'Boston University',
      titles: 'CCC-SLP'
    )

    # Create some studies
    studies = [
      FactoryBot.create(
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
        digital_only: true,
        published_at: 2.days.ago
      ),
      FactoryBot.create(
        :study,
        researcher: researcher,
        title: 'Impact of Speech Therapy Techniques',
        short_desc: 'Investigating the effectiveness of different speech therapy techniques \
                        for managing stuttering in professional settings.',
        long_desc: 'This study focuses on evaluating various speech therapy approaches and their \
                        impact on workplace communication for people who stutter.',
        methodologies: 'interview, task performance',
        total_hours: 3,
        total_sessions: 2,
        duration: '3 weeks',
        remuneration: 75,
        digital_friendly: true,
        digital_only: false,
        city: 'Boston',
        state: 'MA',
        country: 'US',
        published_at: 1.day.ago
      )
    ]

    # Create a participant
    participant = FactoryBot.create(
      :participant,
      user: FactoryBot.create(:user, first_name: 'Michael', last_name: 'Chen'),
      city: 'Cambridge',
      state: 'MA',
      country: 'US'
    )

    ParticipantMailer.with(participant: participant, studies: studies).weekly_online_digest
  end
end
