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
    @article[:date] = DateTime.now.beginning_of_day
    if @article.save
      redirect_to root_url, :notice => "Article saved"
    else
      render "new"
    end
  end

  def read
    @article = Article.find_by_id(:id)
    print @article
  end

  def update
  end

  def delete
  end
end
