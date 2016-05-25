class ProductIdController < ApplicationController

  def create
    @current_category = Category.find(params[:c_Id])

    if @current_category != nil
      @product_id = @current_category.product_ids.create(:p_Id => params[:p_Id])
      render :json => @product_id
    else
      redirect_to "/"
    end
  end

end
