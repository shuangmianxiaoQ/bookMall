<?php
  require_once('../init.php');

  @$uname = $_REQUEST['uname'] or die('{"code": 401, "msg": "用户名是必需的"}');

  $sql = "SELECT uid FROM bm_user WHERE uname='$uname'";
  $result = mysqli_query($conn, $sql);

  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } else {
    $row = mysqli_fetch_assoc($result);
    if(!$row) {
      echo('{"code": 200, "msg": "该用户名可用"}');
    } else {
      echo('{"code": 201, "msg": "该用户名已存在"}');
    }
  }
