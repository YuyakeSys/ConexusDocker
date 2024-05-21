class ProjectSkill < ApplicationRecord
  belongs_to :projects, class_name: 'Project'
  belongs_to :skills, class_name: 'Skill'

  private
  def default_privacy_settings
    self.privacy ||= false # set default privacy to false
  end
end
