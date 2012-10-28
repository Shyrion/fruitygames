class ArticlesController < ApplicationController
  def index
    @articles = Article.all
    @user = User.new
  end

  def new
    @article = Article.new
    @user = User.new
  end

  def create
    @article = Article.new(params[:article])
    @article.creation_date = DateTime.now.beginning_of_day
    @article.user = current_user
    
    if @article.save
      redirect_to root_url, :notice => "Article saved"
    else
      render "new"
    end
  end

  def read
    @user = User.new
    @article = Article.find_by_id(params[:id])
  end

  def update
  end

  def delete
  end
end
