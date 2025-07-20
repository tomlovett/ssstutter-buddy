# frozen_string_literal: true

FactoryBot.define do
  factory :participant do
    user
    location

    codename { Faker::Lorem.words(number: 3).join(' ') }
    birthdate { Faker::Date.birthday(min_age: 18, max_age: 85) }
    gender { %w[m f].sample }
    handedness { %w[r l].sample }
    etiology { 'developmental' }
    default_reveal { false }
    default_distance { rand(25..100) }
  end

  trait :non_american do
    after(:create) do |participant|
      participant.location.update!(
        country: Faker::Address.country_code
      )
    end
  end
end
