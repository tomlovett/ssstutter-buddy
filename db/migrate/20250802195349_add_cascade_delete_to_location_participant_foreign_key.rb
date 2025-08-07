# frozen_string_literal: true

class AddCascadeDeleteToLocationParticipantForeignKey < ActiveRecord::Migration[8.0]
  def change
    # Remove the existing foreign key constraint
    remove_foreign_key :locations, :participants

    # Add the foreign key constraint with CASCADE delete, allowing for dependent: destroy
    add_foreign_key :locations, :participants, on_delete: :cascade
  end
end
