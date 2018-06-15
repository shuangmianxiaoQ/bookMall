<?php
  require_once('../init.php');

  session_start();
  @$oid = $_REQUEST['oid'] or die('{"code": 401, "msg": "订单id是必需的"}');

  $sql = "UPDATE bm_order SET status=2 WHERE oid=$oid";
  $result = mysqli_query($conn, $sql);
  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } else {
    $count = mysqli_affected_rows($conn);
    if($count !== 1) {
      echo('{"code": 201, "msg": "支付失败"}');
    } else {
      $sql = "DELETE FROM bm_shopping_cart";
      $result = mysqli_query($conn, $sql);
      if($result) {
        $count = mysqli_affected_rows($conn);
        if($count > 0) {
          echo('{"code": 200, "msg": "支付成功，并清空购物车"}');
        }
      }
    }
  }
