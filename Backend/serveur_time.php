<?php
include"config.php";
echo json_encode(['serverTime' => time() * 1000]);
