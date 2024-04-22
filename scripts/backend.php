<?php
header('Content-Type: application/json');
$database = new SQLite3('categories.db');

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'fetch':
        fetchCategories();
        break;
    case 'fetchSingle':
        $id = $_GET['id'] ?? '';
        fetchSingleCategory($id);
        break;
    case 'add':
    case 'update':
        saveCategory();
        break;
    case 'delete':
        $id = $_POST['id'] ?? '';
        deleteCategory($id);
        break;
}

function fetchCategories() {
    global $database;
    $result = $database->query('SELECT * FROM categories');
    $categories = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $categories[] = $row;
    }
    echo json_encode($categories);
}

function fetchSingleCategory($id) {
    global $database;
    $stmt = $database->prepare('SELECT * FROM categories WHERE id = ?');
    $stmt->bindValue(1, $id, SQLITE3_INTEGER);
    $result = $stmt->execute();
    $category = $result->fetchArray(SQLITE3_ASSOC);
    echo json_encode($category);
}

function saveCategory() {
    global $database;
    $id = $_POST['id'] ?? '';
    $name = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';
    $price = $_POST['price'] ?? '';
    $type = $_POST['type'] ?? '';

    if ($id) {
        $stmt = $database->prepare("UPDATE categories SET name = ?, description = ?, price = ?, type = ? WHERE id = ?");
        $stmt->bindParam(5, $id);
    } else {
        $stmt = $database->prepare("INSERT INTO categories (name, description, price, type) VALUES (?, ?, ?, ?)");
    }
    $stmt->bindParam(1, $name);
    $stmt->bindParam(2, $description);
    $stmt->bindParam(3, $price);
    $stmt->bindParam(4, $type);
    $stmt->execute();
    echo json_encode(['success' => true]);
}

function deleteCategory($id) {
    global $database;
    $stmt = $database->prepare('DELETE FROM categories WHERE id = ?');
    $stmt->bindValue(1, $id, SQLITE3_INTEGER);
    $stmt->execute();
    echo json_encode(['success' => true]);
}
?>
