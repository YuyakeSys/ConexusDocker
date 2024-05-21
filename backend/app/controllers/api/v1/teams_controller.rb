class Api::V1::TeamsController < ApplicationController
    def create
        member = Team.find_by({ users_id: params[:users_id], projects_id: params[:projects_id] })
        if member.present?
            render json: { message: "Member exists" }
        else
            @team = Team.new(team_params)

            if @team.save
                render json: @team, status: :created
            else
                render json: @team.errors, status: :unprocessable_entity
            end
        end
    end

    def search
        members = Team.where(projects_id: params[:projects_id])
        
        user_names = members.map do |member|
            user = User.find_by(id: member.users_id)
            user.full_name if user.present?
        end.compact
        
        render json: { user_names: user_names }
    end      

    private

    def team_params
        params.require(:team).permit(:users_id, :projects_id)
    end
end
