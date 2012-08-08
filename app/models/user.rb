class User < ActiveRecord::Base

	has_many :articles

	attr_accessible :pseudo, :email, :user_type, :password, :password_confirmation

	attr_accessor :password
	before_save :encrypt_password
	
	validates_confirmation_of :password
	validates_presence_of :password, :on => :create
	validates_presence_of :pseudo
	validates_uniqueness_of :pseudo
	validates_presence_of :email
	validates_uniqueness_of :email

	def self.get_user_type_number(id)
		user = find_by_id(id)
		case user.user_type
		when "admin"
			1
		when "moderator"
			2
		when "regular_user"
			3
		else
			-1
		end
	end

	def self.authenticate(pseudo, password)
		user = find_by_pseudo(pseudo)
		if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
			user
		else
			nil
		end
	end
	
	def self.is_admin(id)
		user = find_by_id(id)
		user.user_type == 2
	end

	def encrypt_password
		if password.present?
			self.password_salt = BCrypt::Engine.generate_salt
			self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
		end
	end

end
