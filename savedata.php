<?php
$data = json_decode(file_get_contents('php://input'), true);
$filename = 'userData.json';

if (file_exists($filename)) {
    $currentData = json_decode(file_get_contents($filename), true);
} else {
    $currentData = [];
}

$currentData[] = $data;
file_put_contents($filename, json_encode($currentData));

echo json_encode(['success' => true]);
?>
