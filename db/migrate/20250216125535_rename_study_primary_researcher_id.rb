# frozen_string_literal: true

class RenameStudyPrimaryResearcherId < ActiveRecord::Migration[7.0]
  def up
    rename_index :studies, 'index_studies_on_primary_researcher_id', 'index_studies_on_researcher_id'
    rename_column :studies, :primary_researcher_id, :researcher_id
  end

  def down
    rename_index :studies, 'index_studies_on_researcher_id', 'index_studies_on_primary_researcher_id'
    rename_column :studies, :researcher_id, :primary_researcher_id
  end
end
