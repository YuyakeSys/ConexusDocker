class Api::V1::ProjectsController < ApplicationController
  before_action :set_project, only: %i[ show update destroy ]

  # GET /projects
  def index
    page_number = params[:page].to_i || 1

    @projects = Project.page(page_number).per(params[:size])

    if params[:search].present?
      @projects = @projects.search_by_name_or_keyword(params[:search])
    end
  
    if params[:filter] == 'created_at'
      @projects = @projects.order(created_at: :desc)
    elsif params[:filter] == 'updated_at'
      @projects = @projects.order(updated_at: :desc)
    elsif params[:filter] == 'main'
      @projects = @projects.order(created_at: :desc).limit(10)
    end
    
    # Get recommend project
    user_id = params[:user_id]
    user_skills = UserSkill.where(users_id: user_id).pluck(:skills_id)
  
    similarity_scores = @projects.map do |project|
      project_skills = ProjectSkill.where(projects_id: project.id).pluck(:skills_id)
      [project, (user_skills & project_skills).length]
    end
  
    recommend_projects = similarity_scores.sort_by { |_, similarity| -similarity }.take(3)
  
    total_projects = Project.count
    page_size = params[:size].to_i.zero? ? 1 : params[:size].to_i
    total_pages = (total_projects.to_f / page_size).ceil unless page_size.zero?
    
    render_data = {
      projects: @projects,
      recommend_projects: recommend_projects,
      total_pages: total_pages
    }
  
    render json: render_data
  end

  # GET /projects/1
  def show
    project = Project.find(params[:id])
    required_skills = project.skills.pluck(:skill_name)
    full_name = project.user.full_name

    render_data = {
      project: @project,
      required_skills: required_skills,
      full_name: full_name
    }

    render json: render_data
  end

  # POST /projects
  def create
    @project = Project.new(project_params)

    if @project.save
      render json: @project, status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/1
  def update
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def project_params
    params.require(:project).permit(:id, :title, :description, :industry, :required_skills, :resource_links, :state, :date, :team_members, :image_url, :user_id, :created_at, :updated_at)
  end
    
end
