# frozen_string_literal: true

class TouchUpUsersResearchers < ActiveRecord::Migration[7.0]
  def change
    change_column_null :users, :first_name, false
    change_column_default :users, :first_name, from: nil, to: ''

    change_column_null :users, :last_name, false
    change_column_default :users, :last_name, from: nil, to: ''

    change_column_null :users, :email, false
    change_column_default :users, :email, from: nil, to: ''

    add_column :researchers, :institution, :string
    add_column :researchers, :titles, :string
  end
end
