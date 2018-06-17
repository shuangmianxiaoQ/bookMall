<?php
  require_once('../init.php');

  session_start();
  @$oid = $_REQUEST['oid'] or die('{"code": 401, "msg": "订单id是必需的"}');

  $sql = "DELETE FROM bm_order WHERE oid=$oid";
  $result = mysqli_query($conn, $sql);

  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } {
    $sql = "DELETE FROM bm_order_info WHERE oid=$oid";
    $result = mysqli_query($conn, $sql);
    echo('{"code":200, "msg":"删除成功"}');
  }