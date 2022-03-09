<?php

    $to = "tracyzhang98@gmail.com";
    $from = $_POST['email'];
    $name = $_POST['name'];
    $headers = "From: $from";
    $subject = "Message from Personal Website";

    $fields = array();
    $fields{"name"} = "name";
    $fields{"email"} = "email";
    $fields{"phone"} = "phone";
    $fields{"message"} = "message";

    

    $body = "Here is what was sent:\r\n"; 

    foreach($fields as $a => $b){$body .= $b." : ".$_POST[$a]."\r\n"; }


    $send = mail($to, $subject, $body, $headers);

?>