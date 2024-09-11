# frozen_string_literal: true

# Participants
user = User.create(first_name: 'Patty', last_name: 'Participant', email: 'p@p.com', password: 'password')
Participant.create(
  user:,
  name_alias: 'Upper Canadian Fowl',
  city: 'Bel Air',
  state: 'MD',
  country: 'US',
  birthdate: '01-01-1990',
  gender: 'M',
  handedness: 'right',
  etiology: 'developmental'
)

# Researcher
user_two = User.create(first_name: 'Randy', last_name: 'Researcher', email: 'p@p.com', password: 'password')
r = Researcher.create(
  user_id: user_two.id,
  university_profile_url: Faker::Internet.url,
  bio: Faker::Lorem.paragraph,
  research_interests: Faker::Lorem.sentence
)

# Studies
Study.create(
  primary_researcher: r,
  title: Faker::Lorem.sentence,
  short_desc: Faker::Lorem.sentences(number: 2),
  long_desc: Faker::Lorem.paragraph,
  open_date: 1.year.ago,
  close_date: 1.year.from_now,
  study_type: Faker::Lorem.sentence,
  min_age: 18,
  max_age: nil,
  city: 'Boston',
  state: 'MA',
  country: 'US',
  total_hours: rand(0.5..5),
  total_sessions: rand(1..3),
  duration: Faker::Lorem.words(number: 2),
  follow_up: nil,
  remuneration: rand(25..100)
)
