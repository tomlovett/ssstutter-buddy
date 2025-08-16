# frozen_string_literal: true

FactoryBot.define do
  factory :user_invitation do
    email { Faker::Internet.email }
    invited_by_id { create(:user).id }
    accepted_at { nil }

    trait :accepted do
      accepted_at { Time.current }
    end
  end
end
