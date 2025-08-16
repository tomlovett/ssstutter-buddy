# frozen_string_literal: true

class AddCascadeDeleteToUserDependentTables < ActiveRecord::Migration[8.0]
  def change
    remove_foreign_key :user_invitations, :users, column: :invited_by_id

    add_foreign_key :user_invitations, :users, column: :invited_by_id, on_delete: :cascade
  end
end
