# frozen_string_literal: true

class CreateParticipants < ActiveRecord::Migration[7.0]
  def change
    create_table :participants do |t|
      t.string :codename
      t.string :country
      t.string :postal_code
      t.date :birthdate
      t.string :gender
      t.string :handedness
      t.string :etiology
      t.boolean :default_reveal, null: false, default: false
      t.float :default_distance, default: 50.0
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
