# frozen_string_literal: true

class AddAutosendVerifiedOnlyToStudies < ActiveRecord::Migration[7.0]
  def change
    add_column :studies, :autosend_verified_only, :boolean, null: false, default: true
  end
end
