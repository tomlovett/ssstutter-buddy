# frozen_string_literal: true

class AddLocationTypeToStudies < ActiveRecord::Migration[8.0]
  def up
    add_column :studies, :location_type, :string, default: 'in_person'

    Study.reset_column_information
    Study.find_each do |study|
      if study.digital_only
        study.update!(location_type: 'digital')
      elsif study.digital_friendly && study.city.present?
        study.update!(location_type: 'hybrid')
      else
        study.update!(location_type: 'in_person')
      end
    rescue ActiveRecord::RecordInvalid => e
      puts "Failed to update study #{study.id}: #{e.message}"
    end
  end

  def down
    remove_column :studies, :location_type
  end
end
