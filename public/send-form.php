<?php
// Taxi Zagreb — Form Handler
// Receives reservation form data and sends email to info@taxi-zagreb.com

header('Content-Type: application/json; charset=utf-8');

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Honeypot check — if this field is filled, it's a bot
if (!empty($_POST['website'])) {
    // Pretend success to not alert the bot
    echo json_encode(['success' => true]);
    exit;
}

// Sanitize input
function clean($value) {
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

$name        = clean($_POST['name'] ?? '');
$email       = clean($_POST['email'] ?? '');
$phone       = clean($_POST['phone'] ?? '');
$passengers  = clean($_POST['passengers'] ?? '');
$date        = clean($_POST['date'] ?? '');
$time        = clean($_POST['time'] ?? '');
$pickup      = clean($_POST['pickup'] ?? '');
$destination = clean($_POST['destination'] ?? '');
$message     = clean($_POST['message'] ?? '');
$lang        = clean($_POST['lang'] ?? 'hr');

// Validate required fields
if (!$name || !$email || !$phone || !$passengers || !$date || !$time || !$pickup || !$destination) {
    http_response_code(400);
    if ($lang === 'en') {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Molimo ispunite sva obavezna polja.']);
    }
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    if ($lang === 'en') {
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Molimo unesite ispravnu email adresu.']);
    }
    exit;
}

// Build email
$to = 'info@taxi-zagreb.com';
$subject = "Nova rezervacija — $name";

$body = "NOVA REZERVACIJA\n";
$body .= "================================\n\n";
$body .= "Ime i prezime: $name\n";
$body .= "Email: $email\n";
$body .= "Telefon: $phone\n";
$body .= "Broj putnika: $passengers\n";
$body .= "Datum: $date\n";
$body .= "Vrijeme: $time\n";
$body .= "Polazište: $pickup\n";
$body .= "Odredište: $destination\n";

if ($message) {
    $body .= "\nPoruka:\n$message\n";
}

$body .= "\n================================\n";
$body .= "Poslano sa: taxi-zagreb.com\n";

$headers = "From: noreply@taxi-zagreb.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    if ($lang === 'en') {
        echo json_encode(['success' => true, 'message' => 'Your reservation has been sent successfully! We will contact you shortly.']);
    } else {
        echo json_encode(['success' => true, 'message' => 'Vaša rezervacija je uspješno poslana! Kontaktirat ćemo vas u najkraćem roku.']);
    }
} else {
    http_response_code(500);
    if ($lang === 'en') {
        echo json_encode(['success' => false, 'message' => 'An error occurred. Please call us at +385 92 419 8229.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Došlo je do greške. Molimo nazovite nas na +385 92 419 8229.']);
    }
}
