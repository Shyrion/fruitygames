#!/bin/env ruby
# encoding: utf-8

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
  		redirect_to root_url, :notice => "Vous êtes maintenant connecté(e)"
  	else
  		flash.now.alert = "Combinaison identifiant / mot de passe incorrecte"
      redirect_to root_url
  	end
  end
  
  def destroy
  		session[:user_id] = nil
  		redirect_to root_url, :notice => "Vous êtes maintenant déconnecté(e)"
  end
end
