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
    digital_friendly { rand > 0.6 }
    digital_only { digital_friendly && rand > 0.7 }

    trait :with_follow_up do
      follow_up { Faker::Lorem.sentence }
    end

    trait :digital_only do
      digital_friendly { true }
      digital_only { true }
    end

    trait :in_person do
      digital_friendly { false }
      digital_only { false }

      after(:create) do |study|
        create(:location, study:)
      end
    end

    trait :hybrid do
      digital_friendly { true }
      digital_only { false }

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
