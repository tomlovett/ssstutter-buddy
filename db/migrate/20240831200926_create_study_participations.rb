# frozen_string_literal: true

class CreateStudyParticipations < ActiveRecord::Migration[7.0]
  def change
    create_table :study_participations do |t|
      t.timestamp :not_interested
      t.timestamp :registered
      t.timestamp :invited
      t.string :invitation_response
      t.boolean :no_show, null: false, default: false
      t.boolean :completed, null: false, default: false
      t.integer :participant_rating
      t.references :study, null: false, foreign_key: true
      t.references :participant, null: false, foreign_key: true

      t.timestamps
    end

    add_index :studies, :primary_researcher_id
  end
end
