Rails.application.routes.draw do
  get 'skills/create'
  resources :projects
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    passwords: 'users/passwords'
  }
  
  # API routes should be in /api/v1
  namespace :api do
    namespace :v1 do 
      get "teams/search" => "teams#search"
      get "users/find_user" => "users#find"
      get 'users/search' => "users#search"
      resources :skills, only: [:create, :index]
      get '/suggestions', to: 'skill_suggest#index'
      post '/saveUserSkill', to: 'save_skill#save_user_skill'
      post '/saveProjectSkill', to: 'save_skill#save_project_skill'
      post '/saveSkill', to: 'save_skill#save_skill'
      get '/member/suggestions', to: 'users#suggestions' 
      get 'users/check_admin', to: 'users#check_admin'
      resources :posts
      resources :projects
      resources :users do
        member do
          get 'get_user_brief'
          get :get_avatar
          put :update_avatar
        end
      end
      resources :teams 
    end 
  end 
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
