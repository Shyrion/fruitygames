class CreateUserFriendshipsJoinTable < ActiveRecord::Migration
  def up
  	create_table :users_users, :id => false do |t|
      t.belongs_to :user1, :class_name => "User"
      t.belongs_to :user2, :class_name => "User"
    end
    #add_index :users_users, [:user_id, :user_id] # Optionnel
  end

  def down
    drop_table :users_users
  end
end
