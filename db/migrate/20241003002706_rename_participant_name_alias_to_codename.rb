# frozen_string_literal: true

class RenameParticipantNameAliasToCodename < ActiveRecord::Migration[7.0]
  def change
    rename_column :participants, :codename, :codename
  end
end
