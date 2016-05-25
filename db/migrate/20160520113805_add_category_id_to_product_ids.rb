class AddCategoryIdToProductIds < ActiveRecord::Migration
  def change
    add_column :product_ids, :category_id, :integer
  end
end
