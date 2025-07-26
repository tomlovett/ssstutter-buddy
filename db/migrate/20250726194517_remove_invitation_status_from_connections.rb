# frozen_string_literal: true

class RemoveInvitationStatusFromConnections < ActiveRecord::Migration[8.0]
  def change
    remove_column :connections, :invitation_status, :string

    add_column :invitations, :status_explanation, :text, null: true
  end
end
