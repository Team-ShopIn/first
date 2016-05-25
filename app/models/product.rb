class Product < ActiveRecord::Base
  belongs_to :user
  belongs_to :category
  validates :url, presence: true

end
