<?php

Route::group(['prefix' => 'contenteditor'], function () {
    Route::post('image/upload', 'Cubecamp\ContentEditor\Http\Controllers\ImageController@upload');
    Route::post('image/save', 'Cubecamp\ContentEditor\Http\Controllers\ImageController@save');
});