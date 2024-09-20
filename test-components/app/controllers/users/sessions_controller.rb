# frozen_string_literal: true
require 'jwt'

class Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token, only: [:create, :verify]
  respond_to :json

  def verify
    token = extract_token
    payload = JWT.decode(token, Rails.application.credentials.jwt_key_base)
    user = User.find(payload.first['user_id'])

    render json: {message: "#{user.to_json()}"}
  end

  def create
    user = User.find_by(email: params[:email]) || User.find_by(username: params[:email])


    if user&.valid_password?(params[:password])
      # Generate JWT token
      token = JWT.encode({ user_id: user.id, exp: 24.hours.from_now.to_i }, Rails.application.credentials.jwt_key_base)
      # Send token to the frontend
      render json: { token: token, message: 'Logged in successfully', user: [user.username, user.email] }, status: :ok
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
