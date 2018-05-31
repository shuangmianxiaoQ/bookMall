<?php
  require_once('../init.php');

  session_start();
  @$uid = $_SESSION['loginUid'] or die('{"code": 401, "msg": "用户未登录"}');

  // 图片上传
  if($_FILES["file"]["error"] > 0) {
    echo "Error: ".$_FILES["file"]["error"]."<br/>";
  } else {
    echo "upload: ".$_FILES["file"]["name"]."<br/>";
    echo "type: ".$_FILES["file"]["type"]."<br/>";
    echo "size ".($_FILES["file"]["size"]/1024)."kb<br/>";
    echo "stored in: ".$_FILES["file"]["tmp_name"]."<br/>";
    if(file_exists("upload/".$_FILES["file"]["name"])) {
      echo $_FILES["file"]["name"]."已存在";
    } else {
      move_uploaded_file($_FILES["file"]["tmp_name"], "upload/".$_FILES["file"]["name"]);
    }
  }
