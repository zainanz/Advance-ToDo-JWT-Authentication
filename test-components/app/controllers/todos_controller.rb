class TodosController < ApplicationController
  before_action :retreive_user

  def user_todos
    todos = @user.todos
    render json: {todos: todos}, status: :ok
  end

  def add_todo
    todo = Todo.new(user: @user);
    todo.content = params["todo"]
    if todo.save!
      render json: nil, status: :ok
    else
      render json: { error: "An error occured" }, status: :unprocessable_entity
    end
  end
  private

  def retreive_user
    token = extract_token
    payload = JWT.decode(token, Rails.application.credentials.jwt_key_base)
    @user = User.find(payload.first['user_id'])
    render status: :unauthorized if @user.nil?
  end
end
