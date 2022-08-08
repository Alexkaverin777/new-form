<?php

$post = $_POST; // get all POST data
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

$post_data = [ // поля нашего запроса

   'firstname' => $data['first_name'],
    'lastname' => $data['last_name'],
    'email' => $data['email'],
    'phone' => $data['phone'],
    'country_code' => $data['country_code'],
    'password' => $data['password'],
    // 'token' => $data['token'],
    // 'comment' => $data['comment'],
    // 'keitaro_id' => $data['keitaro_id'],
    "ai" => "2958039",
    "ci" => "1",
    "gi" => "25",
    "so" => $_COOKIE['source'],
    "userip" => $_SERVER['REMOTE_ADDR'],
    'pixel' => $_COOKIE['fbpixel'],
];

$curl = curl_init();
$new_data = json_encode($post_data);

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://gt.gotraffic.cc/api/signup/procform',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => $new_data,
  CURLOPT_HTTPHEADER => array(
    'x-trackbox-username: DailyTraffic',
    'x-trackbox-password: Djkt485Nd',
    'x-api-key: 2643889w34df345676ssdas323tgc738',
    'Content-Type: application/json'
  ),
));

//$response = curl_exec($curl);
$rawResult = curl_exec($curl);

echo $rawResult;




curl_close($curl);

?>
