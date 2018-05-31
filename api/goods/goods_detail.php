<?php
  require_once('../init.php');

  @$gid = $_REQUEST['gid'];

  $sql = "SELECT * FROM bm_goods WHERE gid=$gid";
  $result = mysqli_query($conn, $sql);
  $row = mysqli_fetch_all($result, MYSQLI_ASSOC);

  $sql = "SELECT fname FROM bm_goods_family WHERE fid = (SELECT fid FROM bm_goods WHERE gid=$gid)";
  $result = mysqli_query($conn, $sql);
  $row[0]['fname'] = mysqli_fetch_row($result)[0];

  $sql = "SELECT * FROM bm_goods_pic WHERE gid=$gid";
  $result = mysqli_query($conn, $sql);
  $row['picList'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

  $sql = "SELECT * FROM bm_goods_detail WHERE gid=$gid";
  $result = mysqli_query($conn, $sql);
  $row['detail'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

  echo json_encode($row);