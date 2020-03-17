<?php namespace Cubecamp\Blog\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableDeleteCubecampBlog extends Migration
{
    public function up()
    {
        Schema::dropIfExists('cubecamp_blog_');
    }
    
    public function down()
    {
        Schema::create('cubecamp_blog_', function($table)
        {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id')->unsigned();
            $table->text('comment')->nullable()->default('NULL');
            $table->bigInteger('post_id')->nullable()->unsigned()->default(NULL);
            $table->timestamp('created_at')->nullable()->default('NULL');
            $table->timestamp('updated_at')->nullable()->default('NULL');
            $table->bigInteger('user_id')->nullable()->unsigned()->default(NULL);
        });
    }
}
