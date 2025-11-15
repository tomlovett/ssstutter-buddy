# frozen_string_literal: true

class AddLastVerifiedActiveToStudies < ActiveRecord::Migration[8.0]
  def up
    add_column :studies, :last_verified_active, :datetime, default: -> { 'CURRENT_TIMESTAMP' }

    # Set last_verified_active to the maximum of 30 days ago or the study's updated_at
    Study.reset_column_information
    Study.active.find_each do |study|
      last_verified = [30.days.ago, study.updated_at].max
      study.update(last_verified_active: last_verified)
    end
  end

  def down
    remove_column :studies, :last_verified_active
  end
end
