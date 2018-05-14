<?php
  require_once('../init.php');

  @$kw = $_REQUEST['kw'];

  // 多关键字查询
  if(!$kw) {
    return;
  } else {
    $kws = explode(' ', $kw);
    for($i=0; $i<count($kws); $i++) {
      $kws[$i] = "gname like '%".$kws[$i]."%'";
    }
  }

  $sql = "SELECT gname FROM bm_goods WHERE ".join(' AND ', $kws)."LIMIT 10";
  $result = mysqli_query($conn, $sql);

  if(!$result) {
    echo("请检查SQL语句：$sql");
  } else {
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($rows);
  }
