class ApplicationController < ActionController::Base
  include ActionController::HttpAuthentication::Token::ControllerMethods
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  protect_from_forgery with: :null_session
  allow_browser versions: :modern
  def extract_token
    authenticate_or_request_with_http_token do |token, options|
      return token
    end
  end
end
