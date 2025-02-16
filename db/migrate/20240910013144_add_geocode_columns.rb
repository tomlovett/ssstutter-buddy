# frozen_string_literal: true

class AddGeocodeColumns < ActiveRecord::Migration[7.0]
  def change
    change_table :participants, bulk: true do |t|
      t.add_column :city, :string
      t.add_column :state, :string
      t.remove_column :postal_code, :string
    end

    change_table :studies, bulk: true do |t|
      t.add_column :city, :string
      t.add_column :state, :string
      t.remove_column :postal_code, :string
    end
  end
end
