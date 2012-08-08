class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string  :pseudo
      t.string  :password_hash
      t.string  :password_salt
      t.string  :email
      t.integer :user_type
      t.date    :creation_date
      t.string  :avatar

      t.timestamps
    end
  end
end
