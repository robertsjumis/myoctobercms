<?php namespace Cubecamp\ContentEditor\Components;

use Cache;
use File;
use BackendAuth;
use Cms\Classes\Page;
use Cms\Classes\Content;
use Cms\Classes\CmsObject;
use Cms\Classes\ComponentBase;
//use League\HTMLToMarkdown\HtmlConverter;
use RainLab\Blog\Components\Post;
use RainLab\Blog\Models\Post as BlogPost;

use Cubecamp\ContentEditor\Models\Settings;

class BlogEditor extends ComponentBase
{

	public $content;
	public $isEditor;
	public $file;
	public $fileMode;

	public $defaultFile;
	public $fixture;
	public $tools;
	public $class;
	public $buttons;
	public $palettes;

	public $renderCount;
	public $additional_styles;


	/**
	 * @var Post
	 */
	public $postComponent;

	/**
	 * @var \RainLab\Blog\Models\Post
	 */
	public $post;

	public function componentDetails()
	{
		return [
			'name'        => 'Blog Editor',
			'description' => 'Edit your front-end blog in page.'
		];
	}

	public function defineProperties()
	{
		return [
			'slug' => [
				'title'       => 'rainlab.blog::lang.settings.post_slug',
				'description' => 'rainlab.blog::lang.settings.post_slug_description',
				'default'     => '{{ :slug }}',
				'type'        => 'string'
			],
			'categoryPage' => [
				'title'       => 'rainlab.blog::lang.settings.post_category',
				'description' => 'rainlab.blog::lang.settings.post_category_description',
				'type'        => 'dropdown',
				'default'     => 'blog/category',
			],
		];
	}

	public function onRun()
	{

		$this->postComponent = new Post($this->page);
		$this->postComponent->setProperty('slug', $this->property('slug'));
		$this->postComponent->setProperty('categoryPage', $this->property('categoryPage'));
		$this->postComponent->onRun();
		$this->post = $this->postComponent->post;

		$this->isEditor = $this->checkEditor();

		if ($this->isEditor) {
/*
			$this->addJs('/modules/system/assets/js/framework.extras.js', 'core');
			$this->addJs('/modules/backend/assets/js/october-min.js', 'core');

			$this->addCss('/modules/backend/assets/css/october.css', 'core');
			$this->addCss('/modules/backend/assets/css/controls.css', 'core');
*/
/*
			foreach($formController->getAssetPaths() as $type => $assets) {
				foreach ($assets as $asset) {
					$this->{'add' . ucfirst($type)}($asset);
				}
			}
*/
			$this->buttons = Settings::get('enabled_buttons');
			$this->palettes = Settings::get('style_palettes');

			// put content tools js + css
			$this->addCss(['assets/new/content-tools.min.css', 'assets/new/contenteditor.css']);
			$this->addJs(['assets/new/content-tools.js', 'assets/new/contenteditor.js'], [
				'defer' => 'defer'
			]);

//			$this->addCss('assets/new/contenteditor.css');
//			$this->addJs('assets/new/contenteditor.js', ['defer' => 'defer']);
			
		}
/*
		$this->isEditor = $this->checkEditor();

		if ($this->isEditor) {
			// Piggy back the Backend's rich editor
//            $this->addCss('/modules/backend/formwidgets/richeditor/assets/vendor/redactor/redactor.css');
//            $this->addJs('/modules/backend/formwidgets/richeditor/assets/vendor/redactor/redactor.js');

			$this->addCss('/plugins/rainlab/editable/assets/vendor/redactor/redactor.css');
			$this->addJs('/plugins/rainlab/editable/assets/vendor/redactor/redactor.js', [
				'defer' => 'defer'
			]);


			$this->addCss('assets/css/editable.css');
			$this->addJs('assets/js/editable.js', [
				'defer' => 'defer'
			]);
		}
*/
	}

	public function onRender()
	{
		$this->additional_styles = Settings::renderCss();
		$this->renderCount = $this->page['renderCount'] += 1;

		$this->defaultFile = $this->property('file');
		$this->file = $this->setFile($this->property('file'));
		$this->fixture = $this->property('fixture');
		$this->tools = $this->property('tools');
		$this->class = $this->property('class');

//		$content = $this->getFile();

/*
		if ($this->checkEditor()) {
			$this->content = $content;
		} else {
			return Cache::remember('contenteditor::content-' . $this->file, now()->addHours(24), function () use ($content) {
				return $this->renderPartial('@render.htm', ['content' => $content]);
			});
		}
*/
	}


	public function onSave()
	{
		if (!$this->checkEditor())
			return;

		try {
//			$converter = new HtmlConverter();
			/**
			 * @var BlogPost $post
			 */
			$post = BlogPost::findOrFail(post('file'));
			$post->content = post('content');
			$post->reading_time = floor(( strlen(strip_tags(post('content'))) / 1100) * 60);

//			$post->content = $converter->convert(post('content'));
			
			$post->save();
		} catch (\Exception $e) {
			echo 'Error' . $e->getMessage();
			return;
		}

	}

	public function checkEditor()
	{
		$backendUser = BackendAuth::getUser();
		return $backendUser && $backendUser->hasAccess(Settings::get('permissions', 'cms.manage_content'));
	}


	/**
	 * Renders a requested partial in context of this component,
	 * see Cms\Classes\Controller@renderPartial for usage.
	 */
	public function renderPartial()
	{
		$content = $this->postComponent->renderPartial();

		$this->controller->setComponentContext($this);
		$result = call_user_func_array([$this->controller, 'renderPartial'], func_get_args());
		$this->controller->setComponentContext(null);
		return $result;
	}


	public function getCategoryPageOptions()
	{
		return Page::sortBy('baseFileName')->lists('baseFileName', 'baseFileName');
	}








	/**
	 * From ContentEditor
	 *
	 */

	public function fileExists($file) {
		return File::exists((new Content)->getFilePath($file));
	}

	public function translateExists()
	{
		return class_exists('\RainLab\Translate\Classes\Translator');
	}

	public function getFile()
	{
		if (Content::load($this->getTheme(), $this->file)) {
			return $this->renderContent($this->file);
		} else if (Content::load($this->getTheme(), $this->defaultFile)) { // if no locale file exists -> render the default, without language suffix
			return $this->renderContent($this->defaultFile);
		}

		return '';
	}

	public function setFile($file)
	{
		// Compatability with RainLab.Translate
		if ($this->translateExists()) {
			return $this->setTranslateFile($file);
		}

		return $file;
	}

	public function setTranslateFile($file)
	{
		$translate = \RainLab\Translate\Classes\Translator::instance();
		$defaultLocale = $translate->getDefaultLocale();
		$locale = $translate->getLocale();

		// Compability with Rainlab.StaticPage
		// StaticPages content does not append default locale to file.
		if ($this->fileExists($file) && $locale === $defaultLocale) {
			return $file;
		}

		return substr_replace($file, '.'.$locale, strrpos($file, '.'), 0);
	}

}