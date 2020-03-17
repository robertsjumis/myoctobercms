<?php namespace Cubecamp\Blog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateCubecampBlogComments extends Migration
{
    public function up()
    {
        Schema::create('cubecamp_blog_comments', function($table)
        {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id')->unsigned();
            $table->text('comment')->nullable();
            $table->bigInteger('post_id')->nullable()->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
            $table->bigInteger('user_id')->nullable()->unsigned();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('cubecamp_blog_comments');
    }
}
