# frozen_string_literal: true
require 'jwt'

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def verify
    token = extract_token
    payload = JWT.decode(token, Rails.application.credentials.jwt_key_base)
    user = User.find(payload.first['user_id'])

    render json: { message: user.to_json() }
  end

  def create
    user = User.find_by(email: params[:email]) || User.find_by(username: params[:email])


    if user&.valid_password?(params[:password])
      token = JWT.encode({ user_id: user.id, exp: 24.hours.from_now.to_i }, Rails.application.credentials.jwt_key_base)
      render json: { token: token, user: user.to_json() }, status: :ok
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        message: "logged out successfully"
      }, status: :ok
    else
      render json: {
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end
