# frozen_string_literal: true

FactoryBot.define do
  factory :session do
    user
    user_agent { 'RSpec Test User Agent' }
    ip_address { '127.0.0.1' }

    trait :expired do
      created_at { 31.days.ago }
    end

    trait :active do
      created_at { 1.day.ago }
    end
  end
end
