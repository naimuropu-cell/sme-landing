<?php
/**
 * YES SME - Optional PHP Lead Notification Endpoint
 * Use this script if hosting on cPanel / Apache / PHP server.
 * 
 * To activate:
 * In js/app.js, set: EMAIL_CONFIG.customEndpoint = 'send-lead.php';
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Read JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit;
}

// Company Configuration
$recipient = 'info@yesbangladesh.net';
$fromEmail = 'no-reply@yesbangladesh.net';

$type = isset($data['type']) ? htmlspecialchars($data['type']) : 'Demo Request';
$fullName = isset($data['fullName']) ? htmlspecialchars($data['fullName']) : 'N/A';
$phone = isset($data['phone']) ? htmlspecialchars($data['phone']) : 'N/A';
$business = isset($data['businessName']) ? htmlspecialchars($data['businessName']) : 'N/A';
$plan = isset($data['plan']) ? htmlspecialchars($data['plan']) : 'N/A';
$message = isset($data['message']) ? nl2br(htmlspecialchars($data['message'])) : 'None';
$submittedAt = isset($data['submittedAt']) ? htmlspecialchars($data['submittedAt']) : date('Y-m-d H:i:s');
$lang = isset($data['language']) ? htmlspecialchars($data['language']) : 'en';

$subject = "⚡ New YES SME Lead: {$fullName} ({$phone})";

// HTML Email Body
$body = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; padding: 20px; }
    .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: #064e3b; color: #ffffff; padding: 20px 24px; }
    .header h2 { margin: 0; font-size: 20px; }
    .header p { margin: 4px 0 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 24px; }
    .row { display: flex; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }
    .label { width: 140px; font-weight: 700; color: #64748b; font-size: 13px; text-transform: uppercase; }
    .val { flex: 1; font-size: 15px; color: #0f172a; font-weight: 600; }
    .highlight { color: #059669; font-size: 17px; }
    .footer { background: #f8fafc; padding: 14px 24px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class='card'>
    <div class='header'>
      <h2>⚡ New YES SME Lead Received</h2>
      <p>Source: {$type} · Language: {$lang}</p>
    </div>
    <div class='content'>
      <div class='row'><div class='label'>Client Name:</div><div class='val'>{$fullName}</div></div>
      <div class='row'><div class='label'>Phone Number:</div><div class='val highlight'><a href='tel:{$phone}'>{$phone}</a></div></div>
      <div class='row'><div class='label'>Business / Shop:</div><div class='val'>{$business}</div></div>
      <div class='row'><div class='label'>Interested Plan:</div><div class='val'>{$plan}</div></div>
      <div class='row'><div class='label'>Requirements:</div><div class='val'>{$message}</div></div>
      <div class='row' style='border:none;'><div class='label'>Submitted At:</div><div class='val' style='font-size:13px; color:#64748b;'>{$submittedAt}</div></div>
    </div>
    <div class='footer'>
      YES SME Cloud ERP & Smart POS · YES Bangladesh
    </div>
  </div>
</body>
</html>
";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: YES SME Landing Page <' . $fromEmail . '>',
    'Reply-To: ' . $recipient,
    'X-Mailer: PHP/' . phpversion()
];

$sent = @mail($recipient, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Lead email delivered successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Mail delivery failed']);
}
