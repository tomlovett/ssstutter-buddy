# frozen_string_literal: true

FactoryBot.define do
  factory :connection do
    participant
    study

    not_interested { nil }
    registered { nil }
    invited { nil }
    intvitation_response { [nil, 'accepted', 'rejected'].sample }
    no_show { false }
    completed { false }
    participant_rating { rand(1..5) }
  end
end
