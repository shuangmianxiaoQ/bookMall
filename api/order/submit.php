<?php
  require_once('../init.php');

  session_start();
  @$uid = $_REQUEST['uid'] or die('{"code": 401, "msg": "用户未登录"}');

  @$aid = $_REQUEST['aid'];
  @$total_price = $_REQUEST['total_price'];
  @$status = $_REQUEST['status'];
  @$order_time = $_REQUEST['order_time'];

  $sql = "INSERT INTO bm_order VALUES(NULL,$uid,$aid,$total_price,$status,$order_time)";
  $result = mysqli_query($conn, $sql);
  $oid = mysqli_insert_id($conn);
  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } else {
    $count = mysqli_affected_rows($conn);
    if($count !== 1) {
      echo('{"code": 201, "msg": "下单失败"}');
    } else {
      $sql = "INSERT INTO bm_order_info(gid,count,oid) SELECT c.gid,c.count,o.oid FROM bm_shopping_cart c,bm_order o WHERE c.uid=o.uid AND o.uid=$uid AND o.oid=$oid";
      $result = mysqli_query($conn, $sql);
      if(!$result) {
        echo('{"code": 500, "msg": "请检查SQL语句"}');
      } else {
        $count = mysqli_affected_rows($conn);
        if($count > 0) {
          echo('{"code": 200, "msg": "下单成功", "oid": '.$oid.'}');
        }
      }
    }
  }
