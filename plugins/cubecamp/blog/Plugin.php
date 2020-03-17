<?php

namespace Cubecamp\Blog;

use System\Classes\PluginBase;

class Plugin extends PluginBase
{
    public function registerComponents()
    {
        return [
            'name' => 'Blog',
            'description' => 'Provides some really cool blog features.',
            'author' => 'CubeCamp',
            'icon' => 'icon-leaf'
        ];
    }

    public function registerSettings()
    {
       
    }
}
