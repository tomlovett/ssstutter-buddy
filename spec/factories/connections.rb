# frozen_string_literal: true

FactoryBot.define do
  factory :connection do
    participant
    study

    study_status { [Connection::CONNECTED, Connection::STUDY_BEGAN].sample }
    invitation_status { [Connection::INVITED, Connection::ACCEPTED, Connection::INTERESTED].sample }
    participant_rating { rand(1..5) }

    trait :in_progress do
      study_status { [Connection::CONNECTED, Connection::STUDY_BEGAN].sample }
      invitation_status { [Connection::ACCEPTED, Connection::INTERESTED].sample }
    end

    trait :completed do
      study_status { Connection::STATUSES_COMPLETED.sample }
      invitation_status { Connection::ACCEPTED }
    end
  end
end
