# frozen_string_literal: true

FactoryBot.define do
  factory :study do
    researcher

    title { Faker::Lorem.sentence }
    short_desc { Faker::Lorem.sentences(number: 2) }
    long_desc { Faker::Lorem.paragraph }
    open_date { '2024-08-31' }
    close_date { '2024-08-31' }
    methodologies { gen_methodologies }
    min_age { 18 }
    max_age { nil }
    total_hours { rand(0.5..5).round(1) }
    total_sessions { rand(1..3).to_i }
    duration { "#{rand(1..5)} #{%w[days weeks months years].sample}" }
    follow_up { nil }
    remuneration { rand(25..100) }
    location_type { %w[digital in_person hybrid].sample }
    last_verified_active { Time.current }

    trait :with_follow_up do
      follow_up { Faker::Lorem.sentence }
    end

    # Status related traits
    trait :draft do
      published_at { nil }
      closed_at { nil }
      paused_at { nil }
    end

    trait :active do
      published_at { Time.current }
      closed_at { nil }
      paused_at { nil }
    end

    trait :paused do
      published_at { Time.current }
      closed_at { nil }
      paused_at { Time.current }
    end

    trait :closed do
      published_at { Time.current }
      closed_at { Time.current }
      paused_at { nil }
    end

    # Location-related traits
    trait :digital do
      location_type { 'digital' }

      after(:create) do |study|
        study.update(location: nil)
      end
    end

    trait :in_person do
      location_type { 'in_person' }

      after(:create) do |study|
        create(:location, study:)
      end
    end

    trait :hybrid do
      location_type { 'hybrid' }

      after(:create) do |study|
        create(:location, study:)
      end
    end
  end
end

def gen_methodologies
  end_array = []
  types = Study::METHODOLOGIES.dup.shuffle
  rand(2..7).times { end_array << types.pop }
  end_array.join(', ')
end
