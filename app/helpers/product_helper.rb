module ProductHelper
  def category
    if session[:id] != nil
      @category ||= User.find_by_id!(session[:id]).categories.all
    else
      @category = nil
    end
  end
end
