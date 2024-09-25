Rails.application.routes.draw do
  match '*path', to: 'application#options', via: :options
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup',
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  devise_scope :user do
    post '/verify/user' => 'users/sessions#verify'
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get "/gettodo", to: "todos#user_todos"
  post "/addtodo", to: "todos#add_todo"
  post "/markascompleted/:id", to: "todos#mark_as_completed"
  delete "/deletetodo/:id", to: "todos#delete_todo"
end
