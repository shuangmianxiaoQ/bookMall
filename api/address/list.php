<?php
  require_once('../init.php');

  session_start();
  @$uid = $_REQUEST['uid'] or die('{"code":401,"msg":"用户未登录"}');

  $sql = "SELECT * FROM `bm_user_address` WHERE uid=$uid";
  $result = mysqli_query($conn, $sql);

  if(!$result) {
    echo("请检查SQL语句：$sql");
  } else {
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($rows);
  }