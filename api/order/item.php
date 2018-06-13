<?php
  require_once('../init.php');

  session_start();
  @$uid = $_REQUEST['uid'] or die('{"code":401,"msg":"用户未登录"}');
  @$oid = $_REQUEST['oid'] or die('{"code": 401, "msg": "订单id是必需的"}');

  $sql = "SELECT * FROM bm_order o,bm_user_address a WHERE o.aid=a.aid AND oid=$oid";
  $result = mysqli_query($conn, $sql);

  if(!$result) {
    echo("请检查SQL语句：$sql");
  } else {
    $rows = mysqli_fetch_assoc($result);
    echo json_encode($rows);
  }