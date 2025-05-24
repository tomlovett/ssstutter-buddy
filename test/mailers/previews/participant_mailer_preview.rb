# frozen_string_literal: true

# Preview all emails at http://localhost:3001/rails/mailers/participant_mailer
class ParticipantMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3001/rails/mailers/participant_mailer/new_study_alert
  def new_study_alert
    study = FactoryBot.create(:study,
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
                              country: 'US')

    participant = FactoryBot.create(:participant,
                                    user: FactoryBot.create(:user, first_name: 'John', last_name: 'Doe'),
                                    city: 'Cambridge',
                                    state: 'MA',
                                    country: 'US')

    puts "study: #{study.inspect}"
    puts "participant: #{participant.inspect}"

    ParticipantMailer.with(study: study, participant: participant).new_study_alert
  end
end
