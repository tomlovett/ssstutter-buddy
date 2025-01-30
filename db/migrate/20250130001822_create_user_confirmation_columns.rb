class CreateUserConfirmationColumns < ActiveRecord::Migration[7.0]
  def change
    add_column :user, :confirmation_pin, :string
    add_column :user, :confirmed, :datetime
  end
end
