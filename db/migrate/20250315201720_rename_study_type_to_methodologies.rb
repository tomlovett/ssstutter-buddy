class RenameStudyTypeToMethodologies < ActiveRecord::Migration[7.0]
  def change
    rename_column :studies, :study_type, :methodologies
  end
end
