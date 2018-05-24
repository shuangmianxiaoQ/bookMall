<?php
  require_once('../init.php');

  @$kw = trim($_REQUEST['kw']);
  @$pno = $_REQUEST['pno'];

  if(!$pno) {
    $pno = 1;
  } else {
    $pno = intval($pno);
  }

  $output = [
    'totalItems' => 0,        // 查询到的总记录数
    'itemsPerPage' => 8,      // 每页显示的数量
    'pno' => $pno,            // 当前页在第几页
    'goodsLists' => null      // 当前页的数据
  ];

  $sql = "SELECT COUNT(*) FROM bm_goods WHERE gname LIKE '%$kw%' OR author LIKE '%$kw%' OR publishing LIKE '%$kw%'";
  $result = mysqli_query($conn, $sql);
  $rows = mysqli_fetch_row($result);
  $output['totalItems'] = intval($rows[0]);

  $start = $output['itemsPerPage'] * ($pno - 1);
  $end = $output['itemsPerPage'];
  $sql = "SELECT gid,gname,title,author,price,publishing,publish_time,introduction FROM bm_goods ".($kw?"WHERE gname LIKE '%$kw%' OR author LIKE '%$kw%' OR publishing LIKE '%$kw%'":"")." LIMIT $start, $end";
  $result = mysqli_query($conn, $sql);

  if(!$result) {
    echo("请检查SQL语句：$sql");
  } else {
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    for($i=0; $i<count($rows); $i++) {
      $gid = $rows[$i]['gid'];
      $sql = "SELECT md FROM bm_goods_pic WHERE gid=$gid";
      $result = mysqli_query($conn, $sql);
      $rows[$i]['pic'] = mysqli_fetch_row($result)[0];
    }
    $output['goodsLists'] = $rows;
  }
  echo json_encode($output);
