class CreateProjectSkills < ActiveRecord::Migration[7.0]
  def change
    create_table :project_skills do |t|
      t.references :projects, null: false, foreign_key: true
      t.references :skills, null: false, foreign_key: true

      t.timestamps
    end
  end
end
