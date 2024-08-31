# frozen_string_literal: true

class CreateResearchers < ActiveRecord::Migration[7.0]
  def change
    create_table :researchers do |t|
      t.string :university_profile_url
      t.text :bio
      t.string :research_interests
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
