# frozen_string_literal: true

class AddSurveyOnlyToStudies < ActiveRecord::Migration[7.0]
  def change
    add_column :studies, :survey_only, :boolean, default: false, null: false

    # Migrate existing data: set survey_only = true where methodologies exactly equals "survey"
    reversible do |dir|
      dir.up do
        execute <<-SQL.squish
          UPDATE studies
          SET survey_only = true
          WHERE methodologies = 'Survey'
        SQL
      end
    end
  end
end
