<?php
session_start();
include "db.php";

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'], $data['password'], $data['usertype'])) {
    echo json_encode(["success" => false, "message" => "All fields are required"]);
    exit;
}

$email = trim($data['email']);
$password = trim($data['password']);
$usertype = trim($data['usertype']);

if ($email === "" || $password === "" || $usertype === "") {
    echo json_encode(["success" => false, "message" => "All fields must be filled"]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM users WHERE email=? AND usertype=?");
$stmt->bind_param("ss", $email, $usertype);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && $password === $user['password']) {
    $_SESSION['user'] = [
        "name" => $user['name'],
        "phone" => $user['phone'],
        "email" => $user['email'],
        "usertype" => $user['usertype']
    ];
    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "usertype" => $user['usertype'],
        "name" => $user['name'],
        "phone" => $user['phone'],
        "email" => $user['email']
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}
?>



