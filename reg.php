<?php

$host = 'localhost';
$dbname = 'kisprojekt'; 
$username = 'root';        
$password = '';            

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    die("Adatbázis csatlakozási hiba: " . $e->getMessage());
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $nev         = trim($_POST['nev'] ?? '');
    $loginnev    = trim($_POST['loginnev'] ?? '');
    $jelszo      = $_POST['jelszo'] ?? '';
    $szerepkor   = trim($_POST['szerepkor'] ?? '');
    $mobil       = trim($_POST['mobil'] ?? '');
    $email       = trim($_POST['email'] ?? '');
    $auto        = trim($_POST['auto'] ?? '');
    $pc          = trim($_POST['szamitogep'] ?? '');;


    if (empty($nev) || empty($loginnev) || empty($jelszo) || empty($email) || $auto === null || $pc === null) {
        die("Hiba: Minden mező kitöltése kötelező!");
    }

  
    $sql = "INSERT INTO regisztracio (nev, loginnev, jelszo, szerepkor, auto, pc, mobil, email) 
            VALUES (:nev, :loginnev, :jelszo, :szerepkor, :auto, :pc, :mobil, :email)";

    $stmt = $pdo->prepare($sql);

    try {
        $stmt->execute([
            ':nev'       => $nev,
            ':loginnev'  => $loginnev,
            ':jelszo'    => $jelszo, 
            ':szerepkor' => $szerepkor,
            ':auto'      => $auto,
            ':pc'        => $pc,
            ':mobil'     => $mobil,
            ':email'     => $email
        ]);

        echo "Sikeres regisztráció!";
    } catch (PDOException $e) {
        echo "Adatbázis hiba a beszúrás során: " . $e->getMessage();
    }
}
?>