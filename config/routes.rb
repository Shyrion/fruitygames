FruityGames::Application.routes.draw do

  get "articles/index"
  get "articles/new"
  get "articles/create"
  get "articles/update"
  get "articles/delete"

  get "log_out" => "sessions#destroy", :as => "log_out"
  
  get "sign_up" => "users#new", :as => "sign_up"
  get "/users" => "users#index"
  get "/users/:id" => "users#show"
  get "/users/:id/edit" => "users#edit"
  post "/users/:id/edit" => "users#update"
  get "users/:id/add" => "users#add_friend"

  get "/profile" => "users#edit"
  #post "/users/:id" => "users#update"
  
  get "articles/:id" => "articles#read"
  
  #match "/users/:name" => "users#show", :via => [:get] <=équivalents=> get "/users/:name" => "users#show"
    
  root :to => "articles#index"
  
  resources :users, :only => [:new, :create, :update, :edit, :show]
  resources :sessions
  resources :articles
end