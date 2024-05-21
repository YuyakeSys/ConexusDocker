class Team < ApplicationRecord
  belongs_to :users, class_name: 'User'
  belongs_to :projects, class_name: 'Project'
end
