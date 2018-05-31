<?php
  require_once('../init.php');

  session_start();
  @$uid = $_REQUEST['uid'] or die('{"code": 401, "msg": "用户未登录"}');

  @$old_pwd = $_REQUEST['old_pwd'];
  @$new_pwd = $_REQUEST['new_pwd'];

  $sql = "UPDATE bm_user SET upwd='$new_pwd' WHERE uid=$uid AND upwd='$old_pwd'";
  $result = mysqli_query($conn, $sql);
  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } else {
    $count = mysqli_affected_rows($conn);
    if($count !== 1) {
      echo('{"code": 201, "msg": "旧密码输入错误"}');
    } else {
      echo('{"code": 200, "msg": "修改成功"}');
    }
  }
