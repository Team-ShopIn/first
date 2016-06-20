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

  def edit
    @current_user = User.find_by_id(session[:id])

    if @current_user != nil
      @products = @current_user.products.find(params[:id])

      if @products != nil
        @products.name = params[:name]
        @products.save
        render :json => @products
      end
    end
  end

  def destroy
    @current_user = User.find_by_id(session[:id])
    @all_categories_id = Array.new

    if params[:id] != nil
      @delete_product = @current_user.products.find(params[:id])
      @delete_product.destroy
      render :json => @delete_product

      @all_categories_id = @current_user.categories.all.select('id')

      @all_categories_id.each do |i|
        @current_user.categories.find(i.id).product_ids.where(:p_Id => params[:id]).destroy_all
      end

    else
      redirect_to "/"
    end
  end

end
