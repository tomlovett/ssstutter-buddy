# frozen_string_literal: true

class MigrateLocationDataToLocations < ActiveRecord::Migration[8.0]
  def up
    puts 'Starting location data migration...'

    puts "Number of participants: #{Participant.count}"

    # Migrate participant locations
    participant_count = 0
    Participant.find_each do |participant|
      # Only create location if participant has any location data
      if participant.city.present? || participant.state.present? || participant.country.present?
        Location.create!(
          participant: participant,
          country: participant.country,
          state: participant.state,
          city: participant.city,
          latitude: participant.latitude,
          longitude: participant.longitude,
          priority: 0
        )
        participant_count += 1
      end
    rescue StandardError => e
      puts "Error migrating participant #{participant.id}: #{e.message}"
    end

    puts "Migrated #{participant_count} participant locations"

    # Migrate study locations
    puts "Number of studies: #{Study.count}"
    study_count = 0
    skipped_count = 0
    Study.find_each do |study|
      if study.city.blank?
        puts "Study #{study.id} has no city"
        skipped_count += 1
      else
        Location.create!(
          study: study,
          country: study.country,
          state: study.state,
          city: study.city,
          latitude: study.latitude,
          longitude: study.longitude,
          priority: 0
        )
        study_count += 1
      end
    rescue StandardError => e
      puts "Error migrating study #{study.id}: #{e.message}"
    end

    puts "Migrated #{study_count} study locations"
    puts "Skipped #{skipped_count} studies"
    puts 'Location data migration completed successfully!'
  end

  def down
    puts 'Rolling back location data migration...'
    deleted_count = Location.count
    Location.destroy_all
    puts "Deleted #{deleted_count} location records"
  end
end
