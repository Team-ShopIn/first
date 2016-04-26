class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.integer :price
      t.string :url
      t.text :img
      t.text :comment

      t.timestamps null: false
    end
  end
end
