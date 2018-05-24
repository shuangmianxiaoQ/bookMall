<?php
  require_once('../init.php');

  @$gid = $_REQUEST['gid'];

  $sql = "SELECT * FROM bm_goods WHERE gid=$gid";
  $result = mysqli_query($conn, $sql);
  $row = mysqli_fetch_all($result, MYSQLI_ASSOC);

  $sql = "SELECT * FROM bm_goods_pic WHERE gid=$gid";
  $result = mysqli_query($conn, $sql);
  $row['picList'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

  echo json_encode($row);