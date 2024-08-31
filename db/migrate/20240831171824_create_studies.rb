# frozen_string_literal: true

class CreateStudies < ActiveRecord::Migration[7.0]
  def change
    create_table :studies do |t|
      t.string :title
      t.text :short_desc
      t.text :long_desc
      t.date :open_date
      t.date :close_date
      t.string :type
      t.integer :min_age
      t.integer :max_age
      t.string :country
      t.string :postal_code
      t.float :total_hours
      t.integer :total_sessions
      t.string :duration
      t.string :follow_up
      t.integer :remuneration
      t.integer :primary_researcher_id, foreign_key: true

      t.timestamps
    end
  end
end
