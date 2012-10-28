# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Emanuel', :city => cities.first)

#@user[:user_type] = 3 # regular_user
user = User.create([
	{
	:username => 'admin',
	:password => 'fruityadmin',
	:email => 'admin@fruity-games.fr',
	:coins => 999999,
	:birthday => DateTime.now.to_date,
	:inscription_date => DateTime.now.to_date,
	:user_type => 1
	},
	{
	:username => 'jeremy',
	:password => 'jeremy',
	:email => 'jeremy.gabriele@gmail.com',
	:coins => 9999,
	:birthday => DateTime.now.to_date,
	:inscription_date => DateTime.now.to_date,
	:user_type => 2
	},
	{
	:username => 'antho',
	:password => 'antho',
	:email => 'germainanthony@gmail.com',
	:coins => 9999,
	:birthday => DateTime.now.to_date,
	:inscription_date => DateTime.now.to_date,
	:user_type => 2
	},
	])