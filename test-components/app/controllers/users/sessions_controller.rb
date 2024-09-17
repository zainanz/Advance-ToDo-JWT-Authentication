# frozen_string_literal: true
require 'jwt'

class Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token, only: [:create]
  respond_to :json

  def create
    user = User.find_by(email: params[:email])

    if user&.valid_password?(params[:password])
      # Generate JWT token
      token = JWT.encode({ user_id: user.id, exp: 24.hours.from_now.to_i }, Rails.application.credentials.secret_key_base)
      # Send token to the frontend
      render json: { token: token, message: 'Logged in successfully' }, status: :ok
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
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
