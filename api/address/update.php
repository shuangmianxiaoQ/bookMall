<?php
  require_once('../init.php');

  session_start();
  @$aid = $_REQUEST['aid'] or die('{"code":401,"msg":"用户地址id是必需的"}');
  @$receiver = $_REQUEST['receiver'];
  @$province = $_REQUEST['province'];
  @$city = $_REQUEST['city'];
  @$county = $_REQUEST['county'];
  @$street = $_REQUEST['street'];
  @$phone = $_REQUEST['phone'];
  @$postcode = $_REQUEST['postcode'];
  @$is_default = $_REQUEST['is_default'];

  $sql = "UPDATE bm_user_address SET receiver=$receiver,province=$province,city=$city,county=$county,street=$street,phone=$phone,postcode=$postcode WHERE aid=$aid";
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