# frozen_string_literal: true

class RenameConnectionColumns < ActiveRecord::Migration[8.0]
  def change
    rename_column :connections, :invitation_response, :invitation_status
    rename_column :connections, :status, :study_status
  end
end
