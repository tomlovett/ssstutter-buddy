# frozen_string_literal: true

class RenameStudyStatusToStatusInConnections < ActiveRecord::Migration[8.0]
  def change
    rename_column :connections, :study_status, :status
  end
end
