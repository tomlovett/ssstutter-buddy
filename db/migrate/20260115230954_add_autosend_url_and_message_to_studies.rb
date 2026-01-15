# frozen_string_literal: true

class AddAutosendUrlAndMessageToStudies < ActiveRecord::Migration[8.0]
  def change
    change_table :studies, bulk: true do |t|
      t.text :autosend_url, null: true
      t.text :autosend_message, null: true
    end
  end
end
