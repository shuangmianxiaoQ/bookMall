<?php
  /**
   * 向首页返回展示的数据，如新品上架，热销产品，读者推荐等
   * 返回形式为JSON数组
   */
  require_once('../init.php');

  $output = [];

  // 获取首页轮播图片
  $sql = "SELECT img,href FROM bm_index_carousel LIMIT 5";
  $result = mysqli_query($conn, $sql);
  $output['carouselItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

  // 获取书籍类目
  $sql = "SELECT fname FROM bm_goods_family";
  $result = mysqli_query($conn, $sql);
  $output['categoryItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

  // 获取新品上架内容
  $sql = "SELECT gname,title,author,price,pic,href FROM bm_index_goods WHERE new_arrival>0 ORDER BY new_arrival LIMIT 8";
  $result = mysqli_query($conn, $sql);
  $output['newArrivalItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

  // 获取热销书籍
  $sql = "SELECT gname,title,author,price,publishing,publish_time,pic,href FROM bm_index_goods WHERE top_sale>0 ORDER BY top_sale LIMIT 9";
  $result = mysqli_query($conn, $sql);
  $output['topSaleItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

  echo json_encode($output);

