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