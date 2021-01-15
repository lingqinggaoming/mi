<?php
header("content-type:text/html;charset=utf-8");

// $mysql_config = array(
//     'host' => 'localhost',
//     'db_user' => 'root',
//     'db_pass' => '',
//     'db' => 'admin'
// );
// $mysqli = @new mysqli($mysql_config['host'], $mysql_config['db_user'], $mysql_config['db_pass']);
define('host', 'localhost');
define('db_user', 'root');
define('db_pass', '');
define('db', 'mi');

$mysqli = new mysqli(host, db_user, db_pass);
if ($mysqli->connect_errno) {
    die('连接错误' . $mysqli->connect_errno);
}

// 设置查询字符
$mysqli->query("set names utf8");

//选择数据库
$select_db = $mysqli->select_db(db);
if (!$select_db) {
    echo '数据库选择错误' . $mysqli->error;
};