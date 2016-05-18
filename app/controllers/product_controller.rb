class ProductController < ApplicationController

  def create
    @current_user = User.find_by_id(session[:id])
    if params[:title] != nil
      @product = @current_user.products.create(:url => params[:url],:name => params[:title], :price => params[:price],:img => params[:image])
    else
      @product = @current_user.products.create(:url => params[:url])
    end
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

  def cart
    @current_user = User.find_by_id(session[:id])

    if @current_user != nil
      @products = @current_user.products.all.order("created_at DESC")
      if params[:clicked] == "ok"
        render :json => @products
      end
    else
      redirect_to "/"
    end
  end

  def sort
    @current_user = User.find_by_id(session[:id])

    if @current_user != nil
      if params[:howmuch] == "low"
        @products_price = @current_user.products.all.sort_by(&:price)
      else
        @products_price = @current_user.products.all.sort_by(&:price).reverse
      end
      render :json => @products_price
    else
      redirect_to "/"
    end
  end

end
