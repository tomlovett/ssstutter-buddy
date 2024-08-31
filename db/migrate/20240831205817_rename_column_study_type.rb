# frozen_string_literal: true

class RenameColumnStudyType < ActiveRecord::Migration[7.0]
  def change
    rename_column :studies, :type, :study_type
  end
end
