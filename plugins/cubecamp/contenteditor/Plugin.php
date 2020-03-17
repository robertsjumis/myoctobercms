<?php namespace Cubecamp\ContentEditor;

use System\Classes\PluginBase;

/**
 * ContentEditor Plugin Information File
 */
class Plugin extends PluginBase
{

    /**
     * Returns information about this plugin.
     *
     * @return array
     */
    public function pluginDetails()
    {
        return [
            'name'        => 'Content Editor',
            'description' => 'Front-end content editor',
            'author'      => 'CubeCamp',
            'icon'        => 'icon-edit'
        ];
    }

    public function registerComponents()
    {
        return [
            'Cubecamp\ContentEditor\Components\ContentEditor' => 'contenteditor',
			'Cubecamp\ContentEditor\Components\BlogEditor' => 'blogeditor',
        ];
    }

    public function registerSettings()
    {
        return [
            'settings' => [
                'label'       => 'Content Editor Settings',
                'description' => 'Manage main editor settings.',
                'icon'        => 'icon-cog',
                'class'       => 'Cubecamp\ContentEditor\Models\Settings',
                'order'       => 500,
                'permissions' => ['cubecamp.contenteditor.access_settings']
            ]
        ];
    }

    public function registerPermissions()
    {
        return [
            'cubecamp.contenteditor.access_settings' => [
                'tab' => 'Content Editor',
                'label' => 'Access content editor settings'
            ],
        ];
    }
/*
	public function registerFormWidgets()
	{
		return [
			'Backend\FormWidgets\CodeEditor' => [
				'label' => 'Code editor',
				'code'  => 'codeeditor'
			],

			'Backend\FormWidgets\RichEditor' => [
				'label' => 'Rich editor',
				'code'  => 'richeditor'
			],

			'Backend\FormWidgets\MarkdownEditor' => [
				'label' => 'Markdown editor',
				'code'  => 'markdown'
			],

			'Backend\FormWidgets\FileUpload' => [
				'label' => 'File uploader',
				'code'  => 'fileupload'
			],

			'Backend\FormWidgets\Relation' => [
				'label' => 'Relationship',
				'code'  => 'relation'
			],

			'Backend\FormWidgets\DatePicker' => [
				'label' => 'Date picker',
				'code'  => 'datepicker'
			],

			'Backend\FormWidgets\TimePicker' => [
				'label' => 'Time picker',
				'code'  => 'timepicker'
			],

			'Backend\FormWidgets\ColorPicker' => [
				'label' => 'Color picker',
				'code'  => 'colorpicker'
			],

			'Backend\FormWidgets\DataTable' => [
				'label' => 'Data Table',
				'code'  => 'datatable'
			],

			'Backend\FormWidgets\RecordFinder' => [
				'label' => 'Record Finder',
				'code'  => 'recordfinder'
			],

			'Backend\FormWidgets\Repeater' => [
				'label' => 'Repeater',
				'code'  => 'repeater'
			],

			'Backend\FormWidgets\TagList' => [
				'label' => 'Tag List',
				'code'  => 'taglist'
			]
		];
	}
*/
}
