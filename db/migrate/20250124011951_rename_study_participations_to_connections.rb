# frozen_string_literal: true

class RenameStudyParticipationsToConnections < ActiveRecord::Migration[7.0]
  def up
    rename_table :study_participations, :connections

    add_column :connections, :pin, :string, default: ''
  end

  def down
    remove_column :connections, :pin, :string

    rename_table :connections, :study_participations
  end
end
