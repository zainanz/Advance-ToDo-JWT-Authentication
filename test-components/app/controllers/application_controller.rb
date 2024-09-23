class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  def extract_token
    authenticate_or_request_with_http_token do |token, options|
      return token
    end
  end

  def retreive_user
    begin
      token = extract_token
      payload = JWT.decode(token, Rails.application.credentials.jwt_key_base)
      @user = User.find(payload.first["user_id"])
    rescue StandardError => e
      render json: { error: e }, status: :unauthorized
    end
  end
end
