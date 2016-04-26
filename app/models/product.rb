class Product < ActiveRecord::Base

  has_many :category_ids, dependent: :destroy
  belongs_to :user
end
