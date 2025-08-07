# frozen_string_literal: true

class AddCascadeDeleteToLocationStudyForeignKey < ActiveRecord::Migration[8.0]
  def change
    # Remove the existing foreign key constraint
    remove_foreign_key :locations, :studies

    # Add the foreign key constraint with CASCADE delete, allowing for dependent: destroy
    add_foreign_key :locations, :studies, on_delete: :cascade
  end
end
