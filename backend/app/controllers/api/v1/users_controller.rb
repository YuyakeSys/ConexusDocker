class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false

  def search
    full_name = params[:full_name]
    if full_name.present?
      user = User.find_by(full_name: full_name)
      if user
        user_id = user.id
        render json: { user_id: user_id }, status: :ok
      else
        render json: { message: 'User does not exist.' }, status: :not_found
      end
    else
      render json: {message: 'Consultant name parameter is missing.'}, status: :bad_request
    end
  end

  def find
    user = User.find_by(email: params[:email])
    if user
      skill_names = user.skills.pluck(:skill_name)
      
      render json: { id: user.id, 
        email: user.email,  
        full_name: user.full_name, 
        education: user.education, 
        user_type: user.user_type,
        skills: skill_names,
        team_member: user.team_member,
        image_url: user_avatar_url(user)
     }, status: :ok
    else
      render json: { info: "User not found" }, status: :no_content
    end
  end

  # GET 
  def index
    per_page = params[:per_page] || 15
    page = params[:page] || 1
    entrepreneur = []
    if params[:page_type] == 'main'
      # Return a limited number of consultants and companies for the main page
      consultants = User.where(user_type: 'consultant').limit(15)
      companies = User.where(user_type: 'company').limit(15)
    elsif params[:page_type] == 'companies'
      consultants = [] # or omit this line if you don't want to include consultants at all
      companies = User.where(user_type: 'company').page(page).per(per_page)
      # total pages for company page
      total_pages = companies.total_pages
      current_page = companies.current_page
    elsif params[:page_type] == 'admin'
      # Return all users with pagination
      users = User.all.page(page).per(per_page)
      total_pages = users.total_pages
      current_page = users.current_page
    else
    # Handle other cases or default behavior
      consultants = User.where(user_type: 'consultant')
      entrepreneur = User.where(user_type: 'entrepreneur')
      companies = User.where(user_type: 'company')
  end

  # Map over the users to include the image_url
  consultants = consultants.map do |user|
    {
      id: user.id,
      full_name: user.full_name,
      image_url: user_avatar_url(user)
    }
  end

  companies = companies.map do |user|
    {
      id: user.id,
      full_name: user.full_name,
      image_url: user_avatar_url(user),
      mission: user.mission
    }
  end

  render json: {
    consultants: consultants,
    companies: companies,
    total_pages: total_pages,
    entrepreneur: entrepreneur,
    current_page: current_page
  }
end

  def show
    user = User.find_by(id: params[:id])
    if user
      projects = user.projects.select(:id, :title, :image_url, :description, :industry).map do |project|
      truncated_description = project.description.truncate_words(13, omission: '...')
      project.attributes.merge(truncated_description: truncated_description)
    end
    objects = []
    if user.belong_to_ids
        objects = User.where(id: user.belong_to_ids).map do |u|
          { avatar: user_avatar_url(u), id: u.id, full_name: u.full_name }
        end
      end
      skill_names = user.skills.pluck(:skill_name)
      
      render json: { id: user.id, 
      email: user.email,  
      full_name: user.full_name, 
      education: user.education, 
      user_type: user.user_type,
      skills: skill_names,
      team_member: user.team_member,
      image_url: user_avatar_url(user),
      mission: user.mission,
      status: user.status,
      country: user.country,
      city: user.city,
      industry: user.industry,
      projects: projects,
      belong_to_avatars: objects,
     }, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  # to check if the user is admin
  def check_admin
    user = User.find_by(id: params[:user_id])
    if user
      render json: { is_admin: user.admin? }, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def update
    user = User.find_by(id: params[:id])
    if user
      # Ensure the current_user is the user who is trying to make the update or is an admin
      if user.update(user_params)
        render json: { message: "User successfully updated", user: user }, status: :ok
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def suggestions
    users = User.all

    if params[:name].present?
      users = users.where("full_name LIKE ?", "%#{params[:name]}%")
    end

    if params[:user_type].present?
      users = users.where(user_type: params[:user_type])
    end

    users = users.limit(15)
    render json: users, only: [:id, :full_name]
  end

  def get_user_brief
    user = User.select(:id, :full_name, :image_url).find_by(id: params[:id])

    if user
      render json: { id: user.id, full_name: user.full_name, image_url: user.image_url }, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def update_avatar
    user = User.find(params[:id])
    user.avatar.attach(params[:avatar])
    if user.save
      render json: { message: 'Avatar updated successfully' }, status: :ok
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  def get_avatar
    user = User.find_by(id: params[:id])
    if user && user.avatar.attached?
      image_url = user_avatar_url(user)
      render json: { image_url: image_url }, status: :ok
    else
      render json: { error: "User or avatar not found" }, status: :not_found
    end
  end


  def user_params
    # This allows the :full_name and :education attributes to be modified through the update action
    params.require(:user).permit(:full_name, :education, :avatar, :country, :city, :belong_to_ids, :admin)
  end

  def user_avatar_url(user)
    # This generates a URL if the user has an avatar attached; otherwise, it returns nil
    user.avatar.attached? ? rails_blob_url(user.avatar, only_path: true) : nil
  end

end
