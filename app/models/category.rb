class Category < ActiveRecord::Base
  has_many :product_ids, dependent: :destroy
  belongs_to :user
end
