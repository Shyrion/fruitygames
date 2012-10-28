#!/bin/env ruby
# encoding: utf-8

class UsersController < ApplicationController

  before_filter :is_logged_in, :only => [:edit, :update, :add_friend]

  def is_logged_in
    if current_user == nil
      redirect_to root_url, :notice => "Vous n'êtes pas connecté(e)"
      return
    end
  end

  def convert_date(hash, date_symbol_or_string)
    attribute = date_symbol_or_string.to_s
    return Date.new(hash[attribute + '(1i)'].to_i, hash[attribute + '(2i)'].to_i, hash[attribute + '(3i)'].to_i)   
  end

  def index
    @user = User.new
    @users = User.all
  end

  def new
    @user = User.new
  end
  
  def create
  	@user = User.new(params[:user])
    @user[:user_type] = 3 # regular_user
    @user[:coins] = 0
    @user[:birthday] = DateTime.now.to_date
  	@user[:inscription_date] = DateTime.now.to_date
  	if @user.save
  		redirect_to root_url, :notice => "Votre compte a été créé avec succès"
  	else
  		render "new"
  	end
  end
  
  def show
  	@user = User.find_by_id(params[:id])
  	if @user == nil
	  	redirect_to root_url, :notice => "L'utilisateur n'existe pas"
	  end

    print @user.inspect
  end
  
  def edit
    if params[:id]
      @user = User.find_by_id(params[:id]) # DRY :/
    else
      @user = current_user # get /profile
    end

    if @user == nil
      redirect_to root_url, :notice => "L'utilisateur n'existe pas"
      return
    end

    if @user != current_user
      redirect_to root_url, :notice => "L'utilisateur recherché n'est pas celui actuellement connecté"
      return
    end

    @waiting_friends = []
    @real_friends = []
    @stalker_friends = []

    @user.friends.each do |friend|
      if (friend.friends.include?(@user))
        @real_friends << friend
      else
        @waiting_friends << friend
      end
    end

    User.all.each do |user|
      if (user.friends.include?(@user) and !@user.friends.include?(user))
        @stalker_friends << user
      end
    end
  end
  
  def update
  	user = User.find_by_id(params[:id])

		if user == nil
			redirect_to root_url, :notice => "L'utilisateur n'existe pas"
			return
		end

    user[:email] = params[:user][:email]
		user[:user_type] = params[:user_type]
    user[:birthday] = convert_date(params[:user], :birthday)

    print "----------------"
    print user[:birthday]

		if user.save()
      redirect_to "/profile", :notice => "Votre profil a été correctement mis à jour"
    else
      print "SAVE PAS OK !!!!!!!!!!!!!!!!"
    end
		
  end

  def add_friend
    user = User.find_by_id(params[:id])

    # User does not exist
    if user == nil
      redirect_to root_url, :notice => "L'utilisateur n'existe pas"
      return
    end

    # User already friend
    if (current_user.friends.include?(user))
      redirect_to root_url, :notice => "#{user.username} fait déjà partie de vos amis"
      return
    end

    # User is self
    if (current_user == user)
      redirect_to root_url, :notice => "Vous ne pouvez pas être votre ami :)"
      return
    end

    current_user.friends << user

    redirect_to root_url, :notice => "#{user.username} fait maintenant partie de vos amis"

  end

end
