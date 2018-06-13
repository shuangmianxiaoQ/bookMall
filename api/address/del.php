<?php
  require_once('../init.php');

  session_start();
  @$aid = $_REQUEST['aid'] or die('{"code":401,"msg":"用户地址id是必需的"}');

  $sql = "DELETE FROM bm_user_address WHERE aid=$aid";
  $result = mysqli_query($conn, $sql);

  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } {
    echo('{"code":200, "msg":"删除成功"}');
  }