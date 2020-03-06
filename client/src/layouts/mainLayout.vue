<template>
<div id="app">
<div class="content">
<router-view/>
</div>






<div id="main">
<div class="left_menu">
  <div class="menu">
    <div class="profile_link"><a href="#"><i class="fas fa-user-alt"></i></a></div>
    <div class="search_room"><input type="text" placeholder="Search"></div>
  </div>
  <div data-simplebar class="room_list">


  </div>
</div>
<div class="right_menu">
  <div class="room_info">
    <div class="room_info_main">
      <div class="room_text_info">
        <div class="room_name">Lorem ipsum</div>
        <div class="room_date_last_connect">last seen 8:03</div>
      </div>
      <div class="room_settings_buttons">
        <div class="room_settings_button"><i class="fas fa-search"></i></div>
        <div class="room_settings_button"><i class="fas fa-ellipsis-v"></i></div>
      </div>
    </div>
  </div>
  <div id="chat_area" >
    <div class="chat_area_main">


			<div class="empty"></div>


    </div>

</div>
  <div class="send_area">

  </div>
</div>
</div>



</div>
</template>
