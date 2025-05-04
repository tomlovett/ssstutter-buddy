# frozen_string_literal: true

class AddTimelineToStudies < ActiveRecord::Migration[8.0]
  def change
    change_table :studies, bulk: true do |t|
      t.datetime :paused_at
      t.datetime :published_at
      t.datetime :closed_at
    end
  end
end
