# frozen_string_literal: true

class TouchUpUsersResearchers < ActiveRecord::Migration[7.0]
  def change
    change_table :users, bulk: true do |t|
      t.change_column_null :first_name, false
      t.change_column_default :first_name, from: nil, to: ''

      t.change_column_null :last_name, false
      t.change_column_default :last_name, from: nil, to: ''

      t.change_column_null :email, false
      t.change_column_default :email, from: nil, to: ''
    end

    change_table :researchers, bulk: true do |t|
      t.add_column :institution, :string
      t.add_column :titles, :string
    end
  end
end
