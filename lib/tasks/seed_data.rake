# frozen_string_literal: true

require 'factory_bot_rails'

desc 'Seed database with all required seed data'
namespace :seed do
  task dev: [:environment] do
    puts ''
    puts '--- Seeding database ---'

    FactoryBot.create_list(:participant, 30)
    FactoryBot.create_list(:researcher, 5)

    3.times do
      primary_researcher = FactoryBot.create(:researcher)
      FactoryBot.create_list(:study, 2, primary_researcher:)
    end

    # Loop over every table in database
    ActiveRecord::Base.connection.tables.each do |table_name|
      # Changes ID sequence to the current max ID
      # https://www.rubyinrails.com/2019/07/12/postgres-reset-sequence-to-max-id-in-rails/
      ActiveRecord::Base.connection.reset_pk_sequence!(table_name)
    end

    puts '--- Finished seeding database ---'
  end
end
