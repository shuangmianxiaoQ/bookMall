<?php
  require_once('../init.php');

  session_start();
  @$uid = $_REQUEST['uid'] or die('{"code":401,"msg":"用户未登录"}');

  $output = [
    'all' => null,
    'unpaid' => null,
    'unaccepted' => null,
    'cancelled' => null
  ];

  $sql = "SELECT * FROM bm_order o,bm_user_address a WHERE o.aid=a.aid AND o.uid=$uid ORDER BY order_time DESC";
  $result = mysqli_query($conn, $sql);
  if(!$result) {
    echo("请检查SQL语句：$sql");
  } else {
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    for($i=0; $i<count($rows); $i++) {
      $oid = $rows[$i]['oid'];
      $sql = "SELECT i.gid,i.count,g.gname,g.title,p.xs pic FROM bm_order_info i,bm_goods g,bm_goods_pic p WHERE i.gid=g.gid AND g.gid=p.gid AND oid=$oid GROUP BY i.gid";
      $result = mysqli_query($conn, $sql);
      $rows[$i]['orderItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    $output['all'] = $rows;
  }

  $sql = "SELECT * FROM bm_order o,bm_user_address a WHERE o.aid=a.aid AND o.uid=$uid AND status=1 ORDER BY order_time DESC";
  $result = mysqli_query($conn, $sql);
  if(!$result) {
    echo("请检查SQL语句：$sql");
  } else {
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    for($i=0; $i<count($rows); $i++) {
      $oid = $rows[$i]['oid'];
      $sql = "SELECT i.gid,i.count,g.gname,g.title,p.xs pic FROM bm_order_info i,bm_goods g,bm_goods_pic p WHERE i.gid=g.gid AND g.gid=p.gid AND oid=$oid GROUP BY i.gid";
      $result = mysqli_query($conn, $sql);
      $rows[$i]['orderItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    $output['unpaid'] = $rows;
  }

  $sql = "SELECT * FROM bm_order o,bm_user_address a WHERE o.aid=a.aid AND o.uid=$uid AND status=2 ORDER BY order_time DESC";
  $result = mysqli_query($conn, $sql);
  if(!$result) {
    echo("请检查SQL语句：$sql");
  } else {
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    for($i=0; $i<count($rows); $i++) {
      $oid = $rows[$i]['oid'];
      $sql = "SELECT i.gid,i.count,g.gname,g.title,p.xs pic FROM bm_order_info i,bm_goods g,bm_goods_pic p WHERE i.gid=g.gid AND g.gid=p.gid AND oid=$oid GROUP BY i.gid";
      $result = mysqli_query($conn, $sql);
      $rows[$i]['orderItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    $output['unaccepted'] = $rows;
  }

  $sql = "SELECT * FROM bm_order o,bm_user_address a WHERE o.aid=a.aid AND o.uid=$uid AND status=3 ORDER BY order_time DESC";
  $result = mysqli_query($conn, $sql);
  if(!$result) {
    echo("请检查SQL语句：$sql");
  } else {
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    for($i=0; $i<count($rows); $i++) {
      $oid = $rows[$i]['oid'];
      $sql = "SELECT i.gid,i.count,g.gname,g.title,p.xs pic FROM bm_order_info i,bm_goods g,bm_goods_pic p WHERE i.gid=g.gid AND g.gid=p.gid AND oid=$oid GROUP BY i.gid";
      $result = mysqli_query($conn, $sql);
      $rows[$i]['orderItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    $output['cancelled'] = $rows;
  }

  echo json_encode($output);