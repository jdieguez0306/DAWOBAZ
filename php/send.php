<?php
/* =========================================================
   DAWOBAZ form handler — emails every website form to the shop.

   SETUP: change $TO and $FROM below. $FROM must be an address on
   your own domain (e.g. website@dawobaz.com) or mail may be
   treated as spam. Requires PHP with mail() enabled (most
   shared hosts). If your host needs SMTP, tell your developer
   to swap mail() for PHPMailer.
   ========================================================= */

$TO   = 'orders@dawobaz.com';
$FROM = 'website@dawobaz.com';

header('Content-Type: application/json; charset=utf-8');

function respond($code, $payload) {
    http_response_code($code);
    echo json_encode($payload);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'POST only']);
}

/* Spam trap: real visitors never fill this hidden field. */
if (!empty($_POST['website'])) {
    respond(200, ['ok' => true, 'message' => 'Thank you!']);
}

/* Basic rate limit: one submission every 10 seconds per session. */
session_start();
if (isset($_SESSION['last_send']) && time() - $_SESSION['last_send'] < 10) {
    respond(429, ['ok' => false, 'error' => 'Please wait a moment and try again.']);
}

function clean($value, $max = 2000) {
    $value = is_string($value) ? trim($value) : '';
    $value = str_replace(["\r", "\n"], ' ', $value);   // blocks header injection
    return mb_substr($value, 0, $max);
}

function clean_block($value, $max = 5000) {
    $value = is_string($value) ? trim($value) : '';
    return mb_substr(str_replace("\r", '', $value), 0, $max);
}

$type = clean($_POST['form_type'] ?? '', 20);
$allowed = [
    'contact'    => 'Contact form',
    'order'      => 'Order request',
    'sizerun'    => 'Size run request',
    'design'     => 'Artwork / design request',
    'newsletter' => 'Newsletter sign-up',
];
if (!isset($allowed[$type])) {
    respond(400, ['ok' => false, 'error' => 'Unknown form.']);
}

$email = filter_var(clean($_POST['email'] ?? '', 200), FILTER_VALIDATE_EMAIL);
if (!$email) {
    respond(400, ['ok' => false, 'error' => 'A valid email address is required.']);
}

$name = clean($_POST['name'] ?? '', 120);
if ($type !== 'newsletter' && $name === '') {
    respond(400, ['ok' => false, 'error' => 'Name is required.']);
}

/* Build the email body from every field we know about. */
$fields = [
    'name' => 'Name', 'studio' => 'Studio / team', 'email' => 'Email',
    'phone' => 'Phone', 'subject' => 'Topic', 'quantity' => 'Approx. quantity',
    'needed_by' => 'Needed by', 'item' => 'Item', 'message' => 'Message / notes',
];

$lines = [$allowed[$type], str_repeat('-', 40)];
foreach ($fields as $key => $label) {
    if (!isset($_POST[$key]) || $_POST[$key] === '') continue;
    $value = $key === 'message' ? clean_block($_POST[$key]) : clean($_POST[$key]);
    if ($value !== '') $lines[] = $label . ': ' . $value;
}

/* Cart contents for order requests. */
if ($type === 'order' && !empty($_POST['cart'])) {
    $cart = json_decode($_POST['cart'], true);
    if (is_array($cart) && !empty($cart['items'])) {
        $lines[] = '';
        $lines[] = 'ITEMS REQUESTED';
        $lines[] = str_repeat('-', 40);
        foreach (array_slice($cart['items'], 0, 100) as $item) {
            $lines[] = sprintf(
                '%d x %s %s',
                (int)($item['quantity'] ?? 0),
                clean($item['name'] ?? '', 120),
                !empty($item['option']) ? '(' . clean($item['option'], 60) . ')' : ''
            );
        }
    }
}

$subject = '[DAWOBAZ website] ' . $allowed[$type] . ($name ? ' from ' . $name : '');
$headers = [
    'From: DAWOBAZ Website <' . $FROM . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', implode("\n", $lines), implode("\r\n", $headers));

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'Mail could not be sent.']);
}

$_SESSION['last_send'] = time();

$messages = [
    'order'      => "Thank you! Your order request was sent. We'll contact you shortly to confirm details.",
    'newsletter' => 'Thanks for signing up!',
];
respond(200, ['ok' => true, 'message' => $messages[$type] ?? "Thank you! We'll get back to you soon."]);
