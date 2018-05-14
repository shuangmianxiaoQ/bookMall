<?php
  header("Content-Type: application/json; charset=utf-8");
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $db_host = 'localhost';
  $db_user = 'root';
  $db_password = '';
  $db_database = 'bm';
  $db_port = 3306;

  $conn = mysqli_connect($db_host, $db_user, $db_password, $db_database, $db_port);
  mysqli_query($conn, 'SET NAMES UTF8');

  // 执行SQL语句并返回JSON数据的函数
  function sql_excute($sql) {
    global $conn;
    $result = mysqli_query($conn, $sql);
    if(!$result) {
      return "Please check you SQL statement: $sql";
    } else {
      return $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
  }