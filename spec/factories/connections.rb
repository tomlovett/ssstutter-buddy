# frozen_string_literal: true

FactoryBot.define do
  factory :connection do
    participant
    study

    status { Connection::STATUSES.sample }
    invitation_response { [nil, 'accepted', 'rejected'].sample }
    participant_rating { rand(1..5) }

    trait :in_progress do
      status { Connection::IN_PROGRESS_STATUSES.sample }
    end

    trait :completed do
      status { Connection::COMPLETED_STATUSES.sample }
    end
  end
end
