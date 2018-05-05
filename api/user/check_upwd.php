<?php
  require_once('../init.php');

  @$upwd = $_REQUEST['upwd'] or die('{"code": 401, "msg": "密码是必需的"}');

  if(preg_match('/^[A-Za-z0-9]{6,20}$/', $upwd)) {
    echo('{"code": 200, "msg": "该密码可用"}');
  } else {
    echo('{"code": 201, "msg": "该密码不可用"}');
  }
