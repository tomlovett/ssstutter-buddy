# frozen_string_literal: true

FactoryBot.define do
  factory :location do
    participant { nil }
    study { nil }

    country { 'US' }
    state { Faker::Address.state_abbr }
    city { Faker::Address.city }
    latitude { Faker::Address.latitude }
    longitude { Faker::Address.longitude }
    priority { 0 }
  end
end
