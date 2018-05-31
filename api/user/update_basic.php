<?php
  require_once('../init.php');

  session_start();
  @$uid = $_REQUEST['uid'] or die('{"code": 401, "msg": "用户未登录"}');

  @$user_name = $_REQUEST['user_name'];
  @$phone = $_REQUEST['phone'];
  @$gender = $_REQUEST['gender'];

  $sql = "UPDATE bm_user SET user_name='$user_name', phone='$phone', gender='$gender' WHERE uid=$uid";
  $result = mysqli_query($conn, $sql);
  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } else {
    $count = mysqli_affected_rows($conn);
    if($count !== 1) {
      echo('{"code": 201, "msg": "信息未修改"}');
    } else {
      echo('{"code": 200, "msg": "修改成功"}');
    }
  }
