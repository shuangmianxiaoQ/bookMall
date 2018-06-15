<?php
  require_once('../init.php');

  session_start();
  @$uid = $_REQUEST['uid'] or die('{"code":401,"msg":"用户未登录"}');
  @$oid = $_REQUEST['oid'] or die('{"code": 401, "msg": "订单id是必需的"}');

  $output = [
    'addressInfo' => null,
    'orderItems' => null,
    'total' => null
  ];

  $sql = "SELECT * FROM bm_order o,bm_user_address a WHERE o.aid=a.aid AND oid=$oid";
  $result = mysqli_query($conn, $sql);
  $output['addressInfo'] = mysqli_fetch_assoc($result);

  $sql = "SELECT g.gname,g.discount_price price,i.count FROM bm_order_info i,bm_goods g WHERE i.gid=g.gid AND i.oid=$oid";
  $result = mysqli_query($conn, $sql);
  if(!$result) {
    echo("请检查SQL语句：$sql");
  } else {
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    for($i=0; $i<count($rows); $i++) {
      $output['total'] += $rows[$i]['price'] * $rows[$i]['count'];
    }
    $output['orderItems'] = $rows;
  }

  echo json_encode($output);