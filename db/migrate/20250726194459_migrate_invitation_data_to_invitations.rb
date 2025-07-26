# frozen_string_literal: true

class MigrateInvitationDataToInvitations < ActiveRecord::Migration[8.0]
  def up
    # Migrate connections with invitation_status to invitations
    # Use ON CONFLICT DO NOTHING to handle duplicates
    execute <<-SQL.squish
      INSERT INTO invitations (participant_id, study_id, status, created_at, updated_at)
      SELECT participant_id, study_id, invitation_status, created_at, updated_at
      FROM connections
      WHERE invitation_status IS NOT NULL AND invitation_status != ''
      ON CONFLICT (participant_id, study_id) DO NOTHING
    SQL
  end

  def down
    # Remove all invitations
    execute 'DELETE FROM invitations'
  end
end
