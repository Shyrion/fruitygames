class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string  :username
      t.string  :password_hash
      t.string  :password_salt
      t.integer :user_type
      t.string  :email
      t.string  :avatar_url
      t.date    :birthday
      t.integer :coins
      t.date    :inscription_date
      t.date    :last_connection_date

      t.timestamps
    end
  end
end
