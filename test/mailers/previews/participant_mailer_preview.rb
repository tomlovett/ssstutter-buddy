# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/participant_mailer
class ParticipantMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/participant_mailer/new_study_alert
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
      location_type: 'in_person'
    )

    participant = FactoryBot.create(:participant)

    ParticipantMailer.with(study: study, participant: participant).new_study_alert
  end

  # Preview this email at http://localhost:3000/rails/mailers/participant_mailer/weekly_online_digest
  def weekly_online_digest
    researcher = FactoryBot.create(
      :researcher,
      institution: 'Boston University',
      titles: 'CCC-SLP'
    )

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
        location_type: 'digital',
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
        location_type: 'in_person',
        published_at: 1.day.ago
      )
    ]

    participant = FactoryBot.create(:participant)

    ParticipantMailer.with(participant: participant, studies: studies).weekly_online_digest
  end
end
