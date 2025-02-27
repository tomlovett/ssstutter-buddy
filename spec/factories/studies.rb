# frozen_string_literal: true

FactoryBot.define do
  factory :study do
    researcher

    title { Faker::Lorem.sentence }
    short_desc { Faker::Lorem.sentences(number: 2) }
    long_desc { Faker::Lorem.paragraph }
    open_date { '2024-08-31' }
    close_date { '2024-08-31' }
    study_type { Faker::Lorem.sentence }
    min_age { 18 }
    max_age { nil }
    city { Faker::Address.city }
    state { Faker::Address.state_abbr }
    country { 'US' }
    total_hours { rand(0.5..5).round(1) }
    total_sessions { rand(1..3).to_i }
    duration { "#{rand(1..5)} #{%w[days weeks months years].sample}" }
    follow_up { nil }
    remuneration { rand(25..100) }
    fully_digital { rand > 0.6 }

    trait :with_follow_up do
      follow_up { Faker::Lorem.sentence }
    end

    trait :fully_digital do
      fully_digital { true }
    end
  end
end
