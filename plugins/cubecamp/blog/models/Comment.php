<?php namespace Cubecamp\Blog\Models;

use Model;

/**
 * Model
 */
class Comment extends Model
{
    use \October\Rain\Database\Traits\Validation;
    

    /**
     * @var string The database table used by the model.
     */
    public $table = 'cubecamp_blog_comments';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];
}
