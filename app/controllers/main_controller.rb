class MainController < ApplicationController

  def home
    @product = Product.new
  end

  def create
    @product = Product.create(:url => params[:url])

    if @product
      redirect_to root_path(@product)
    else
      render 'home'
    end
  end

  def sign_up

  end

end
