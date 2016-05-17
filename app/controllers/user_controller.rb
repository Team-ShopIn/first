class UserController < ApplicationController

  def create
    @user = User.new
    @user.user_id = params[:user_id]
    @user.password = params[:password]
    @user.email = params[:email]
    @user.save!
  end

  def signUp
  end

  def logIn
    @user = User.find_by_user_id(params[:user_id])
    if @user != nil && @user.password == params[:password]
      session[:id] = @user.id
      @login = true
      respond_to do |format|
        format.json  { render :json => {:login => @login, :nickname => @user.nickname }}
      end
    else
      @login = "false"
      render json: @login
    end

    #render :nothing => true, :status => 200, :content_type => 'text/html'
  end

  def logOut
    session[:id] = nil
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

  def signUpQuery
    @user = User.new
    @user.user_id = params[:user_id]
    @user.password = params[:password]
    @user.name = params[:name]
    @user.email = params[:email]
    @user.nickname = params[:nickname]

    @user.save

    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

  def getCurrentUserId
    @current_user = session[:id]
    render :json => @current_user
  end
end
