<?php
  require_once('../init.php');

  session_start();
  @$uid = $_REQUEST['uid'] or die('{"code":401,"msg":"用户未登录"}');

  $output = [
    'cartItems' => null,
    'total' => null
  ];

  $sql = "SELECT c.cid,g.gid,g.title,g.discount_price price,c.count FROM bm_shopping_cart c,bm_goods g WHERE c.gid=g.gid AND uid=$uid";
  $result = mysqli_query($conn, $sql);

  if(!$result) {
    echo("请检查SQL语句：$sql");
  } else {
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    for($i=0; $i<count($rows); $i++) {
      $gid = $rows[$i]['gid'];
      $sql = "SELECT xs FROM bm_goods_pic WHERE gid=$gid LIMIT 1";
      $result = mysqli_query($conn, $sql);
      $rows[$i]['pic'] = mysqli_fetch_row($result)[0];
      $output['total'] += $rows[$i]['price'] * $rows[$i]['count'];
    }
    $output['cartItems'] = $rows;
  }

  echo json_encode($output);