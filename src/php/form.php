<?php 
$address = 'misha-stelmakh@yandex.ru';
$subject = 'Заявка от ';
$email = $_POST['email'];
$subject = $subject . $email;
$message = 'Пришла новая заявка от ' . $email;
mail($address,$subject,$message );
echo 'OK';
exit;
?>