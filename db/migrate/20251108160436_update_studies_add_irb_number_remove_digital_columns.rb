# frozen_string_literal: true

class UpdateStudiesAddIrbNumberRemoveDigitalColumns < ActiveRecord::Migration[8.0]
  def change
    add_column :studies, :irb_number, :string
  end
end
