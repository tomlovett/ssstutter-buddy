# frozen_string_literal: true

class RemoveMethodologiesFromStudies < ActiveRecord::Migration[8.0]
  def change
    remove_column :studies, :methodologies, :string
  end
end
