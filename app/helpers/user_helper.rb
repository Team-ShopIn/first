module UserHelper
  def h_current_user
    if session[:id] != nil
      @h_current_user ||= User.find_by_id!(session[:id])
    else
      @h_current_user = nil
    end
  end
end
