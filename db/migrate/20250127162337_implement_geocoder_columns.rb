# frozen_string_literal: true

class ImplementGeocoderColumns < ActiveRecord::Migration[7.0]
  def change
    change_table :participants, bulk: true do |t|
      t.add_column :latitude, :float
      t.add_column :longitude, :float
      t.add_index %i[latitude longitude]
    end

    change_table :studies, bulk: true do |t|
      t.add_column :latitude, :float
      t.add_column :longitude, :float
      t.add_index %i[latitude longitude]
    end
  end
end
