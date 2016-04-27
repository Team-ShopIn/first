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
      session[:user_id] = @user.id
      @login = true
      #render json: => {:login => @login, :nickname => @user.nickname }
      respond_to do |format|
        format.json  { render :json => {:login => @login, :nickname => @user.nickname }}
      end
    else
      @login = "false"
      render json: @login
    end

    #render :nothing => true, :status => 200, :content_type => 'text/html'
  end

end
