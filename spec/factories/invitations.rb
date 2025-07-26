# frozen_string_literal: true

FactoryBot.define do
  factory :invitation do
    participant
    study
    status_explanation { nil }

    trait :invited do
      status { Invitation::INVITED }
    end

    trait :accepted do
      status { Invitation::ACCEPTED }
    end

    trait :declined do
      status { Invitation::DECLINED }
      status_explanation { [Faker::Lorem.sentence, nil].sample }
    end

    trait :interested do
      status { Invitation::INTERESTED }
    end

    trait :not_interested do
      status { Invitation::NOT_INTERESTED }
      status_explanation { [Faker::Lorem.sentence, nil].sample }
    end
  end
end
