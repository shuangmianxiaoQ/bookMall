<?php
  require_once('../init.php');

  @$email = $_REQUEST['email'] or die('{"code": 401, "msg": "邮箱地址是必需的"}');

  if(preg_match('/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/', $email)) {
    echo('{"code": 200, "msg": "该邮箱地址可用"}');
  } else {
    echo('{"code": 201, "msg": "该邮箱地址不可用"}');
  }
