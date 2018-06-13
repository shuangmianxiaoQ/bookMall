<?php
  require_once('../init.php');

  session_start();
  @$uid = $_REQUEST['uid'] or die('{"code": 401, "msg": "用户未登录"}');

  @$receiver = $_REQUEST['receiver'];
  @$province = $_REQUEST['province'];
  @$city = $_REQUEST['city'];
  @$county = $_REQUEST['county'];
  @$street = $_REQUEST['street'];
  @$phone = $_REQUEST['phone'];
  @$postcode = $_REQUEST['postcode'];
  @$is_default = $_REQUEST['is_default'];

  $sql = "INSERT INTO bm_user_address VALUES(NULL,$uid,'$receiver','$province','$city','$county','$street','$phone','$postcode',false)";
  $result = mysqli_query($conn, $sql);
  if(!$result) {
    echo('{"code": 500, "msg": "请检查SQL语句"}');
  } else {
    $count = mysqli_affected_rows($conn);
    if($count !== 1) {
      echo('{"code": 201, "msg": "添加失败"}');
    } else {
      echo('{"code": 200, "msg": "添加成功"}');
    }
  }
