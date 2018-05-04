<?php
  require_once('../init.php');

  @$uname = $_REQUEST['uname'] or die('{"code": 401, "msg": "用户名是必需的"}');
  @$upwd = $_REQUEST['upwd'] or die('{"code": 402, "msg": "密码是必需的"}');
  @$email = $_REQUEST['email'] or die('{"code": 403, "msg": "邮箱是必需的"}');

  $sql = "INSERT INTO bm_user(uname, upwd, email) VALUES('$uname', '$upwd', '$email')";
  $result = mysqli_query($conn, $sql);

  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } else {
    echo('{"code": 200, "msg": "注册成功"}');
  }