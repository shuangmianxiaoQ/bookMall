<?php
  require_once('../init.php');

  session_start();
  session_destroy();

  echo ('{"code": 200, "msg": "注销成功"}');