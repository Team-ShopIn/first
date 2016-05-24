class CategoryController < ApplicationController

  def create
    @current_user = User.find_by_id(session[:id])

    if @current_user != nil
      @categories = @current_user.categories.create(:name => params[:name])
      render :json => @categories
    else
      redirect_to "/"
    end
  end

  def show
    @current_user = User.find_by_id(session[:id])
    @product_in_category = Array.new

    if @current_user != nil
      @current_category = @current_user.categories.find(params[:id])
      if @current_category != nil
        @productId_in_category = @current_category.product_ids.all.order("created_at DESC")
        @productId_in_category.each do |i|
          @product_in_category.insert(@product_in_category.length, Product.find(i.p_Id))
        end
      else
        redirect_to "/"
      end
    else
      redirect_to "/"
    end
  end

  def destroy
    @current_user = User.find_by_id(session[:id])

    if params[:id] != nil
      @delete_category = @current_user.categories.find(params[:id])
      @delete_category.destroy
      render :json => @delete_category
    else
      redirect_to "/"
    end
  end

end
