<?php
  require_once('../init.php');

  session_start();
  @$oid = $_REQUEST['oid'] or die('{"code": 401, "msg": "订单id是必需的"}');

  $sql = "UPDATE bm_order SET status=3 WHERE oid=$oid";
  $result = mysqli_query($conn, $sql);
  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } else {
    $count = mysqli_affected_rows($conn);
    if($count !== 1) {
      echo('{"code": 201, "msg": "取消订单失败"}');
    } else {
      echo('{"code": 200, "msg": "取消订单成功"}');
    }
  }
