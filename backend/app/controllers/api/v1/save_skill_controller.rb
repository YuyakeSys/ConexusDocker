module Api
    module V1
        class SaveSkillController < ApplicationController
            skip_before_action :verify_authenticity_token, raise: false

            # Save skill to skills table
            def save_skill
                skills = params[:skill_name]

                if skills.blank?
                    render json: { error: 'No skills provided' }, status: :unprocessable_entity
                    return
                end
                
                skills.each do |skill_name|
                  skill = Skill.find_by(skill_name: skill_name)
              
                  if !skill
                    skill = Skill.new(skill_name: skill)
                    if skill.save
                      render json: { message: 'Skill saved successfully' }, status: :created
                    else
                      render json: { error: 'Failed to save skill' }, status: :unprocessable_entity
                      return
                    end
                  end
                end
            end

            # Save skill to user_skill table (user id, skill id)
            def save_user_skill 
                user_id = params[:user_id]
                skills = params[:skills]
              
                user_skill_params_array = []
              
                skills.each do |skill_name|
                  skill = Skill.find_by(skill_name: skill_name)

                  if skill 
                    user_skill = UserSkill.find_by(skills_id: skill.id, users_id: user_id)
                    if !user_skill
                        user_skill_params_array << { skills_id: skill.id, users_id: user_id }
                    end
                  else
                    new_skill = Skill.create(skill_name: skill_name)
                    user_skill_params_array << { skills_id: new_skill.id, users_id: user_id }
                  end
                end
                UserSkill.create(user_skill_params_array)
            end

            # Save skill to project_skills table (project id, skill id)
            def save_project_skill 
              project_id = params[:project_id]
              skills = params[:skills]

              print("project id", project_id)
              
              project_skill_params_array = []
            
              skills.each do |skill_name|
                skill = Skill.find_by(skill_name: skill_name)
              
                if skill 
                  project_skill = ProjectSkill.find_by(skills_id: skill.id, projects_id: project_id)
                  if !project_skill
                    project_skill_params_array << { skills_id: skill.id, projects_id: project_id }
                  end
                else
                  new_skill = Skill.create(skill_name: skill_name)
                  project_skill_params_array << { skills_id: new_skill.id, projects_id: project_id }
                end
              end
              begin
                ProjectSkill.create!(project_skill_params_array) unless project_skill_params_array.empty?
              rescue ActiveRecord::RecordInvalid => e
                Rails.logger.error "Failed to create project skills: #{e.message}"
              end
            end

            private

            # Save skill to skills table
            def skill_params 
                { skill_name: params[:value] }
            end
        end
    end
end
