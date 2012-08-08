FruityGames::Application.routes.draw do

  get "articles/index"
  get "articles/new"
  get "articles/create"
  get "articles/update"
  get "articles/delete"

  get "log_out" => "sessions#destroy", :as => "log_out"
  
  get "sign_up" => "users#new", :as => "sign_up"
  get "/users/:pseudo" => "users#show"
  get "/users/:pseudo/edit" => "users#edit", :as => "user_edit"
  post "/users/:pseudo/edit" => "users#update"
  
  get "articles/read/:id" => "articles#read"
  
  #match "/users/:name" => "users#show", :via => [:get] <=équivalents=> get "/users/:name" => "users#show"
    
  root :to => "articles#index"
  
  resources :users, :only => [:new, :create]
  resources :sessions
  resources :articles
end