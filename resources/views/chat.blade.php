<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title></title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <style media="screen">
      .list-group {
        overflow-y: scroll;
        height: 400px;
      }
    </style>
  </head>
  <body>

    <div class="container">
      <div class="row" id="app">
        <div class="offset-4 col-6">
          <li class="list-group-item active">Chat Room</li>
          <ul class="list-group" v-chat-scroll>
            <message v-for="(message, key) in chat.messages" :key="key" color="success">@{{ message }}</message>
          </ul>
          <input v-model="message" @keyup.enter="send" type="text" class="form-control" placeholder="type your messsage">
        </div>
      </div>
    </div>

    <script src="{{ asset('js/app.js')}}">
    </script>

  </body>
</html>
