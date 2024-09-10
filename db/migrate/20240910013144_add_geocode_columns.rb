# frozen_string_literal: true

class AddGeocodeColumns < ActiveRecord::Migration[7.0]
  def change
    add_column :participants, :city, :string
    add_column :participants, :state, :string
    remove_column :participants, :postal_code, :string

    add_column :studies, :city, :string
    add_column :studies, :state, :string
    remove_column :studies, :postal_code, :string
  end
end
