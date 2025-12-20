# frozen_string_literal: true

class AddProvisionalToUsers < ActiveRecord::Migration[8.0]
  def change
    # Default will set existing users to false
    add_column :users, :provisional, :boolean, default: false, null: false
  end
end
