class User < ActiveRecord::Base

	has_many :articles
	has_and_belongs_to_many :friends, :class_name => "User",
    	:foreign_key => "user1_id",
    	:association_foreign_key => "user2_id"

	attr_accessible :username, :email, :user_type, :password, :password_confirmation, :coins,
		:birthday, :inscription_date

	attr_accessor :password
	before_save :encrypt_password
	
	validates_confirmation_of :password
	validates_presence_of :password, :on => :create
	validates_presence_of :username
	validates_uniqueness_of :username
	validates_presence_of :email
	validates_uniqueness_of :email

	def self.authenticate(username, password)
		user = find_by_username(username)
		if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
			user
		else
			nil
		end
	end
	
	def self.is_admin()#id
		#user = find_by_id(id)
		#user.user_type == 1
		self.user_type == 1
	end

	def encrypt_password
		if password.present?
			self.password_salt = BCrypt::Engine.generate_salt
			self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
		end
	end

end
