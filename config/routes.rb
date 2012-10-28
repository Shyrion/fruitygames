FruityGames::Application.routes.draw do

  get "games/index"
  get "games/new"
  post "games/create"
  get "games/show"
  get "games/edit"
  post "games/update"
  get "games/delete"
  get "games/:id" => "games#show"

  get "articles/index"
  get "articles/new"
  post "articles/create"
  post "articles/update"
  get "articles/delete"
  get "articles/:id" => "articles#read"

  get "log_out" => "sessions#destroy", :as => "log_out"
  
  get "sign_up" => "users#new", :as => "sign_up"
  get "/users" => "users#index"
  get "/users/:id" => "users#show"
  get "/users/:id/edit" => "users#edit"
  post "/users/:id/edit" => "users#update"
  get "users/:id/add" => "users#add_friend"

  get "/profile" => "users#edit"
  #post "/users/:id" => "users#update"
  
  
  #match "/users/:name" => "users#show", :via => [:get] <=équivalents=> get "/users/:name" => "users#show"
    
  root :to => "articles#index"
  
  resources :users, :only => [:new, :create, :update, :edit, :show]
  resources :sessions
  resources :articles
  resources :games
end