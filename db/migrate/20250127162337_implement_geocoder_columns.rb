# frozen_string_literal: true

class ImplementGeocoderColumns < ActiveRecord::Migration[7.0]
  def change
    add_column :participants, :latitude, :float
    add_column :participants, :longitude, :float
    add_index :participants, %i[latitude longitude]

    add_column :studies, :latitude, :float
    add_column :studies, :longitude, :float
    add_index :studies, %i[latitude longitude]
  end
end
