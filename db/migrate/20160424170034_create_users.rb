class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :user_id
      t.string :password
      t.string :email

      t.timestamps null: false
    end
  end
end
