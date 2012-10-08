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
    @user[:coins] = 0
    @user[:birthday] = DateTime.now.to_date
  	@user[:inscription_date] = DateTime.now.to_date
  	if @user.save
  		redirect_to root_url, :notice => "Signed up!"
  	else
  		render "new"
  	end
  end
  
  def show
  	@user = User.find_by_id(params[:id])
  	if @user == nil
	  	redirect_to root_url, :notice => "User does not exist"
	  end
  end
  
  def edit
    if params[:id]
      @user = User.find_by_id(params[:id]) # DRY :/
    else
      @user = current_user # get /profile
    end

  	if @user == nil
	  	redirect_to root_url, :notice => "User does not exist"
	  end
  end
  
  def update
  	user = User.find_by_id(params[:id])

		if user == nil
			redirect_to root_url, :notice => "User does not exist"
			return
		end

    user[:email] = params[:user][:email]
		user[:user_type] = params[:user_type]

		if user.save()
      redirect_to "/profile", :notice => "User successfully updated"
    else
      print "SAVE PAS OK !!!!!!!!!!!!!!!!"
    end
		
  end
end
