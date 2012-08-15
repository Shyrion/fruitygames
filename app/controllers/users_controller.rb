class UsersController < ApplicationController

  def index
    @user = User.new
    @users = User.all
  end

  def new
    @user = User.new
  end
  
  def create
    print "create user"
  	@user = User.new(params[:user])
  	@user[:user_type] = 3 # regular_user
  	@user[:creation_date] = DateTime.now.beginning_of_day
  	if @user.save
  		redirect_to root_url, :notice => "Signed up!"
  	else
  		render "new"
  	end
  end
  
  def show
  	@user = User.find_by_pseudo(params[:pseudo])
  	if @user == nil
	  	redirect_to root_url, :notice => "User does not exist"
	  end
  end
  
  def edit
    if params[:pseudo]
      @user = User.find_by_pseudo(params[:pseudo]) # DRY :/
    else
      @user = current_user
    end

  	if @user == nil
	  	redirect_to root_url, :notice => "User does not exist"
	  end
  end
  
  def update
  	user = User.find_by_id(params[:id])

    Rails.logger.info("PARAMS: #{params.inspect}")

		if user == nil
			redirect_to root_url, :notice => "User does not exist"
			return
		end
		
    user[:email] = params[:email]
		user[:user_type] = params[:user_type]
		user.save()
			
		redirect_to "/profile", :notice => "User successfully updated"
		
  end
end
