class UsersController < ApplicationController

  def new
  	@user = User.new
  end
  
  def create
    print "create user"
  	@user = User.new(params[:user])
  	@user[:user_type] = 3
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
  	@user = User.find_by_pseudo(params[:pseudo]) # DRY :/

  	if @user == nil
	  	redirect_to root_url, :notice => "User does not exist"
	  end

    print "lol"
  end
  
  def update
  	user = User.find_by_pseudo(params[:pseudo])
  	
		if user == nil
			redirect_to root_url, :notice => "User does not exist"
			return
		end
		
		print "------------------------------"
		print params[:email]
		print params[:user_type]
		print "------------------------------"
		
		user[:email] = params[:email]
		user[:user_type] = params[:user_type]
		user.save()
			
		redirect_to user_edit_path, :notice => "User successfully updated"
		
  end
end
