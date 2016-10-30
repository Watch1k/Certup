<?php
if ($_POST) {
        $to_email = "host.sf@gmail.com"; //Recipient email, Replace with own email here
        
        //check if its an ajax request, exit if not
        if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
            
            $output = json_encode(array( //create JSON data
                'type'=>'error',
                'text' => 'Sorry Request must be Ajax POST'
            ));
            die($output); //exit script outputting json data
        } 
        
        //Sanitize input data using PHP filter_var().
        $user_name = filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
        $user_phone = filter_var($_POST["user_phone"], FILTER_SANITIZE_STRING);
        $user_topic = filter_var($_POST["user_topic"], FILTER_SANITIZE_STRING);

        // subject
        $subject = $user_topic;
        
        //email body
        $message_body = "Тема: " . $user_topic . "\r\n" . "Имя отправителя: " . $user_name . "\r\n" . "Телефон: " . $user_phone;

        //proceed with PHP email.
        $headers = 'From: ' . '' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

        $send_mail = mail($to_email, $subject, $message_body, $headers);
        
        if(!$send_mail)
        {
            //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
            $output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
            die($output);
        }else{
            $output = json_encode(array('type'=>'message', 'text' => 'Hi. Thank you for your email'));
            die($output);
        }
    }
?>