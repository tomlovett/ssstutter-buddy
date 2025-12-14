# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
    password { Faker::Lorem.characters(number: 10) }
    activation_pin { PinGenerator.new.pin }
    confirmed_at { Time.current }
  end

  trait :provisional do
    password { nil }
    password_digest { nil }
  end

  trait :participant do
    participant
  end

  trait :researcher do
    researcher
  end
end
