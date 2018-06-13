<?php
  require_once('../init.php');

  session_start();
  @$uid = $_REQUEST['uid'] or die('{"code": 401, "msg": "用户未登录"}');

  @$aid = $_REQUEST['aid'];
  @$status = $_REQUEST['status'];
  @$order_time = $_REQUEST['order_time'];

  $sql = "INSERT INTO bm_order VALUES(NULL,$uid,$aid,$status,$order_time)";
  $result = mysqli_query($conn, $sql);
  $oid = mysqli_insert_id($conn);
  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } else {
    $count = mysqli_affected_rows($conn);
    if($count !== 1) {
      echo('{"code": 201, "msg": "下单失败"}');
    } else {
      echo('{"code": 200, "msg": "下单成功", "oid": '.$oid.'}');
    }
  }
