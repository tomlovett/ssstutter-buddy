# frozen_string_literal: true

class CreateInvitations < ActiveRecord::Migration[8.0]
  def change
    create_table :invitations do |t|
      t.references :participant, null: false, foreign_key: true
      t.references :study, null: false, foreign_key: true
      t.string :status, default: 'invited'
      t.timestamps
    end

    add_index :invitations, %i[participant_id study_id], unique: true
  end
end
