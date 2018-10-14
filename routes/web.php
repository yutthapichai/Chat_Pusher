<?php

Route::get('/', function () {
    return view('welcome');
});

Route::get('chat', 'ChatController@chat')->name('chat');

Route::post('send', 'ChatController@send')->name('send');

Route::post('saveToSession', 'ChatController@saveToSession')->name('saveToSession');

Route::post('deleteSession', 'ChatController@deleteSession')->name('deleteSession');

Route::post('getOldMessage', 'ChatController@getOldMessage')->name('getOldMessage');

Route::get('check', function(){
  return session('chat');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
