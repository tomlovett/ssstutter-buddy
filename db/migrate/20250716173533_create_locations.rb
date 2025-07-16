# frozen_string_literal: true

class CreateLocations < ActiveRecord::Migration[8.0]
  def change
    create_table :locations do |t|
      t.string :country
      t.string :state
      t.string :city
      t.float :latitude
      t.float :longitude
      t.integer :priority, default: 0
      t.references :participant, null: true, foreign_key: true
      t.references :study, null: true, foreign_key: true

      t.timestamps
    end
  end
end
