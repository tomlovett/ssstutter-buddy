# frozen_string_literal: true

class UpdateConnectionStatusDefault < ActiveRecord::Migration[8.0]
  def change
    change_column_default :connections, :status, from: '', to: 'connected'
  end
end
