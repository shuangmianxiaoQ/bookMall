<?php
  require_once('../init.php');

  session_start();
  @$uid = $_REQUEST['uid'] or die('{"code":401,"msg":"用户未登录"}');
  @$cid = $_REQUEST['cid'] or die('{"code":402,"msg":"购物车条目id是必需的"}');
  @$count = $_REQUEST['count'] or die('{"code":403,"msg":"商品数量是必需的"}');

  $sql = "UPDATE bm_shopping_cart SET count=$count WHERE cid=$cid";
  $result = mysqli_query($conn, $sql);

  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } {
    $row = mysqli_affected_rows($conn);
    if($row !== 1) {
      echo('{"code": 201, "msg": "修改失败"}');
    } else {
      echo('{"code": 200, "msg": "修改成功"}');
    }
  }