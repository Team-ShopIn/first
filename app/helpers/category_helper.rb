module CategoryHelper
  def category
    #@h_current_user ||= User.find_by_id!(session[:user_id])
    if session[:id] != nil
      @category ||= User.find_by_id!(session[:id]).categories.all
    else
      @category = nil
    end
  end
end
