module ApplicationHelper

	def image_url(source)
		abs_path = image_path(source)
		unless abs_path =~ /^http/
			abs_path = "#{request.protocol}#{request.host_with_port}#{abs_path}"
		end
		abs_path
	end

	def avatar_url(user)
		default_image_url = "#{image_url("logo_fg.png")}"
		gravatar_id = Digest::MD5::hexdigest(user.email).downcase
		"http://gravatar.com/avatar/#{gravatar_id}.png?s=100&d=#{default_image_url}"
	end
end
