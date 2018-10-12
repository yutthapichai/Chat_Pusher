<?php

Route::get('/', function () {
    return view('welcome');
});

Route::get('chat', 'ChatController@chat')->name('chat');

Route::post('send', 'ChatController@send')->name('send');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
