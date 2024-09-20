class TodosController < ApplicationController
  before_action :retreive_user, only: [ :user_todos ]

  def user_todos
    todos = @user.todos
    render json: {todos: todos}, status: :ok
  end

  private

  def retreive_user
    token = extract_token
    payload = JWT.decode(token, Rails.application.credentials.jwt_key_base)
    @user = User.find(payload.first['user_id'])
    render status: :unauthorized if @user.nil?
  end
end
