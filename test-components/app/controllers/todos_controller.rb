class TodosController < ApplicationController
  before_action :retreive_user
  before_action :retreive_todo, only: [:delete_todo, :mark_as_completed]

  def user_todos
    todos = @user.todos
    render json: { todos: todos }, status: :ok
  end


  def delete_todo
    if @todo.user === @user
      @todo.destroy()
      render json: nil, status: :ok
    else
      render json: nil, status: :unauthorized
    end
  end


  def mark_as_completed
  if @todo.user === @user
    @todo.completed = true
    @todo.save
    (render json: nil, status: :ok)
  else
   (render json: nil, status: :unauthorized)
  end
  end

  def add_todo
    todo = Todo.new(user: @user)
    todo.content = (params["todo"]).capitalize
    if todo.save!
      render json: todo, status: :created
    else
      render json: { error: "An error occured" }, status: :unprocessable_entity
    end
  end

  private
  def retreive_todo
    @todo = Todo.find(params["id"])
  end

end
