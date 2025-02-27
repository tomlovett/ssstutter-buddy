# frozen_string_literal: true

class ExpandStudyDigitalStatus < ActiveRecord::Migration[7.0]
  def change
    change_table :studies, bulk: true do |t|
      t.rename :fully_digital, :digital_only
      t.boolean :digital_friendly, null: false, default: false
    end
  end
end
