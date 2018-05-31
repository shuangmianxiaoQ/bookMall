<?php
  require_once('../init.php');

  session_start();
  @$uid = $_REQUEST['uid'] or die('{"code": 401, "msg": "用户未登录"}');

  $sql = "SELECT * FROM bm_user WHERE uid = $uid";
  $result = mysqli_query($conn, $sql);
  $row = mysqli_fetch_assoc($result);

  echo json_encode($row);
  