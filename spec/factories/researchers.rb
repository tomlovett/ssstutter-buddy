# frozen_string_literal: true

FactoryBot.define do
  factory :researcher do
    user

    bio { Faker::Lorem.paragraph }
    university_profile_url { Faker::Internet.url }
    institution { Faker::University.name }
    research_interests { Faker::Lorem.sentence }
    titles { ['PhD, CCC, SLP', 'CCC, SLP', 'SLP'].sample }
  end
end
