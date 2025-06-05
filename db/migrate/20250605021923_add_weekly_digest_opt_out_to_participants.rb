# frozen_string_literal: true

class AddWeeklyDigestOptOutToParticipants < ActiveRecord::Migration[7.1]
  def change
    add_column :participants, :weekly_digest_opt_out, :boolean, default: false, null: false
  end
end
