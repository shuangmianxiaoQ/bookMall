<?php
  require_once('../init.php');

  session_start();
  @$uid = $_REQUEST['uid'] or die('{"code":401,"msg":"用户未登录"}');
  @$gid = $_REQUEST['gid'] or die('{"code":402,"msg":"未添加商品"}');
  @$count = $_REQUEST['count'] or die('{"code":403,"msg":"商品数量是必需的"}');

  $sql = "SELECT cid FROM bm_shopping_cart WHERE uid=$uid AND gid=$gid";
  $result = mysqli_query($conn, $sql);
  $row = mysqli_fetch_row($result);
  if(!$row) {
    $sql = "INSERT INTO bm_shopping_cart VALUES(NULL,$uid,$gid,$count)";
  } else {
    $sql = "UPDATE bm_shopping_cart SET count=count+1 WHERE uid=$uid AND gid=$gid";
  }
  $result = mysqli_query($conn, $sql);
  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } else {
    echo('{"code": 200, "msg": "添加成功"}');
  }