# frozen_string_literal: true

class RemoveLocationColumnsFromStudiesAndParticipants < ActiveRecord::Migration[8.0]
  def change
    # Remove location columns from studies table
    change_table :studies, bulk: true do |t|
      t.remove :city, type: :string
      t.remove :state, type: :string
      t.remove :country, type: :string
      t.remove :latitude, type: :float
      t.remove :longitude, type: :float

      t.remove :digital_friendly, type: :boolean
      t.remove :digital_only, type: :boolean
    end

    # Remove the latitude/longitude index from studies
    remove_index :studies, %i[latitude longitude], if_exists: true

    # Remove location columns from participants table
    change_table :participants, bulk: true do |t|
      t.remove :city, type: :string
      t.remove :state, type: :string
      t.remove :country, type: :string
      t.remove :latitude, type: :float
      t.remove :longitude, type: :float
    end

    # Remove the latitude/longitude index from participants
    remove_index :participants, %i[latitude longitude], if_exists: true
  end
end
