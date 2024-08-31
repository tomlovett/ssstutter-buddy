# frozen_string_literal: true

FactoryBot.define do
  factory :researcher do
    user

    bio { Faker::Lorem.paragraph }
    university_profile_url { Faker::Internet.url }
    research_interests { Faker::Lorem.sentence }
  end
end
