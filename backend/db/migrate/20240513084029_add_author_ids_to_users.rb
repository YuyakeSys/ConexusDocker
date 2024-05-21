class AddAuthorIdsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :author_ids, :integer, array: true, default: []
  end
end
