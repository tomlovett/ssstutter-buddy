# frozen_string_literal: true

class AddActivationPinToUsers < ActiveRecord::Migration[7.0]
  def change
    change_table :users, bulk: true do |t|
      t.string :activation_pin
      t.datetime :confirmed_at
    end
  end
end
