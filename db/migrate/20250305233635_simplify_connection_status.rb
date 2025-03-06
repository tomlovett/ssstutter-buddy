# frozen_string_literal: true

class SimplifyConnectionStatus < ActiveRecord::Migration[7.0]
  def up
    change_table :connections, bulk: true do |t|
      t.remove :not_interested, :registered, :invited, :no_show, :completed

      t.string :status, default: ''
      t.text :participant_feedback
    end
  end

  def down
    change_table :connections, bulk: true do |t|
      t.datetime :not_interested
      t.datetime :registered
      t.datetime :invited
      t.boolean :no_show, null: false, default: false
      t.boolean :completed, null: false, default: false

      t.remove :status, :participant_feedback
    end
  end
end
