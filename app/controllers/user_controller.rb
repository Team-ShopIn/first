class UserController < ApplicationController

  def create
    @user = User.new
    @user.user_id = params[:user_id]
    @user.password = params[:password]
    @user.email = params[:email]
    @user.save!
  end

  def login
    @user = User.find_by_user_id(params[:user_id])
    if @user.password == params[:password]
      #login complete
    else
      #back
    end
  end

end
