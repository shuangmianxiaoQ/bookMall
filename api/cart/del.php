<?php
  require_once('../init.php');

  session_start();
  @$cid = $_REQUEST['cid'] or die('{"code":401,"msg":"购物车条目id是必需的"}');

  $sql = "DELETE FROM bm_shopping_cart WHERE cid=$cid";
  $result = mysqli_query($conn, $sql);

  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } {
    echo('{"code":200, "msg":"删除成功"}');
  }