class Product < ActiveRecord::Base
  belongs_to :user
  has_many :category_ids, dependent: :destroy
  validates :url, presence: true

end
