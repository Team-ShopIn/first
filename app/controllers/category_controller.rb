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
