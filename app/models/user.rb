require 'bcrypt'

class User < ActiveRecord::Base
  include BCrypt

  has_many :products, dependent: :destroy
  has_many :categories, dependent: :destroy

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

end
