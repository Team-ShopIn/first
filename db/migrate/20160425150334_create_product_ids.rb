class CreateProductIds < ActiveRecord::Migration
  def change
    create_table :product_ids do |t|
      t.integer :p_Id

      t.timestamps null: false
    end
  end
end
