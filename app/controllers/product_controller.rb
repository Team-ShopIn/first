class ProductController < ApplicationController

  def create
    @current_user = User.find_by_id(session[:id])
    if params[:name] != nil
      @product = @current_user.products.create(:url => params[:url],:name => params[:title], :price => params[:price],:img => params[:image])
    else
      @product = @current_user.products.create(:url => params[:url])
    end
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

  def cart
    @user = User.find_by_id(session[:id])

    if @user != nil
      @products = @user.products.all
    else
      redirect_to "/"
    end

  end

end
