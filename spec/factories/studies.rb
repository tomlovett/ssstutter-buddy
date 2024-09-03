# frozen_string_literal: true

FactoryBot.define do
  factory :study do
    primary_researcher { association(:researcher) }

    title { Faker::Lorem.sentence }
    short_desc { Faker::Lorem.sentences(number: 2) }
    long_desc { Faker::Lorem.paragraph }
    open_date { '2024-08-31' }
    close_date { '2024-08-31' }
    study_type { Faker::Lorem.sentence }
    min_age { 18 }
    max_age { nil }
    country { 'US' }
    postal_code { Faker::Address.zip_code }
    total_hours { rand(0.5..5) }
    total_sessions { rand(1..3) }
    duration { "#{rand(1..5)} #{%w[days weeks months years].sample}" }
    follow_up { nil }
    remuneration { rand(25..100) }

    trait :with_follow_up do
      follow_up { Faker::Lorem.sentence }
    end
  end
end
