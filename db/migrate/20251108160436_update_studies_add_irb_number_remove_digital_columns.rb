# frozen_string_literal: true

class UpdateStudiesAddIrbNumberRemoveDigitalColumns < ActiveRecord::Migration[8.0]
  def up
    change_table :studies, bulk: true do |t|
      t.string :irb_number
      t.remove :digital_only
      t.remove :digital_friendly
    end
  end

  def down
    change_table :studies, bulk: true do |t|
      t.remove :irb_number
      t.boolean :digital_only, null: false, default: false
      t.boolean :digital_friendly, null: false, default: false
    end
  end
end
