class CreateTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :teams do |t|
      t.references :users, null: false, foreign_key: true
      t.references :projects, null: false, foreign_key: true

      t.timestamps
    end
  end
end
