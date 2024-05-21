class Project < ApplicationRecord
    belongs_to :user
    has_many :project_skills, foreign_key: "projects_id"
    has_many :skills, through: :project_skills

    has_one_attached :imageURL

    scope :search_by_name_or_keyword, -> (query) {
    if Rails.env.production?
      where("title ILIKE :query OR description ILIKE :query", query: "%#{query}%")
    else
      where("lower(title) LIKE :query OR lower(description) LIKE :query", query: "%#{query.downcase}%")
    end
  }
end
