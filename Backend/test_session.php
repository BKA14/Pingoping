<?php
session_start();

if (!isset($_SESSION['test'])) {
    $_SESSION['test'] = 'Session test data';
    echo "Session data set!";
} else {
    echo "Session data: " . $_SESSION['test'];
}
?>
