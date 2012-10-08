class SessionsController < ApplicationController
  def new
    @user = User.new
  end
  
  def create
  	user = User.authenticate(params[:username], params[:password])
  	if user
  		session[:user_id] = user.id
      user.last_connection_date = DateTime.now.to_date
      if (user.save())
        print user.inspect
      end
  		redirect_to root_url, :notice => "Logged in !"
  	else
  		flash.now.alert = "Invalid email or password"
      redirect_to root_url
  	end
  end
  
  def destroy
  		session[:user_id] = nil
  		redirect_to root_url, :notice => "Logged out successfully"
  end
end
