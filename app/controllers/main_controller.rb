class MainController < ApplicationController

  def home

  end

  def signUp
    @user = User.new
    @user.user_id = params[:user_id]
    @user.password = params[:password]
    @user.name = params[:name]
    @user.email = params[:email]
    @user.nickname = params[:nickname]

    @user.save

    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

  def logIn
    @user = User.find_by_user_id(params[:user_id])
    if @user.password == params[:password]
      @a = 1
      byebug
      @a = 2
    else
      @b = 2
      byebug
      @b = 3
    end

  end

end
