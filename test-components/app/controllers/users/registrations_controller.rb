class Users::RegistrationsController < Devise::RegistrationsController
  def create
    @user = User.new(username: params[:username], email: params[:email], password: params[:password])
    begin
      @user.save
      token = JWT.encode({ user_id: @user.id }, Rails.application.credentials.jwt_key_base)
      render json: { token: token, user: @user.to_json() }, status: :ok
    rescue => e
      render json: { error: e }
    end
  end

  def respond_with(resource, _opts = {})
    if request.method == "POST" && resource.persisted?
      render json: {
        message: "Signed up sucessfully.", status: :ok
      }
    elsif request.method == "DELETE"
      render json: {
        message: "Account deleted successfully.", status: :ok
      }
    else
      render json: {
       message: "User couldn't be created successfully.", status: :unprocessable_entity
      }
    end
  end
end
