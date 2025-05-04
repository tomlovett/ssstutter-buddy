# frozen_string_literal: true

class UserEmailCleanup < ActiveRecord::Migration[8.0]
  def change
    change_table :users, bulk: true do |t|
      t.datetime :email_verified_at
      t.boolean :digest_opt_out, default: false, null: false

      t.index :email, unique: true
    end
  end
end
