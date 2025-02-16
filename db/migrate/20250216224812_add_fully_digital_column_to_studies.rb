# frozen_string_literal: true

class AddFullyDigitalColumnToStudies < ActiveRecord::Migration[7.0]
  def change
    add_column :studies, :fully_digital, :boolean, null: false, default: false
  end
end
