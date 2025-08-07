# frozen_string_literal: true

FactoryBot.define do
  factory :connection do
    participant
    study

    status { [Connection::CONNECTED, Connection::STUDY_BEGAN].sample }
    participant_rating { rand(1..5) }

    trait :in_progress do
      status { Connection::STUDY_BEGAN }
    end

    trait :completed do
      status { Connection::STATUSES_COMPLETED.sample }
    end
  end
end
