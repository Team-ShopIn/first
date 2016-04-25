class CreateCategoryIds < ActiveRecord::Migration
  def change
    create_table :category_ids do |t|
      t.integer :c_Id

      t.timestamps null: false
    end
  end
end
