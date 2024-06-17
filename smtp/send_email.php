<?php
// header('Access-Control-Allow-Origin: *');
require './class.phpmailer.php';
require './class.smtp.php';

$return_msg = '';
if (isset($_POST) || isset($_GET['test'])) {

    //	primeste variabilele
    foreach ($_POST as $key => $value) {
        $$key = $value;
    }
    $parinte = !empty($parinte) ? $parinte : 'Vlad Popescu';
    $copil = !empty($copil) ? $copil : 'Vlad Popescu';
    $nume = !empty($nume) ? $nume : 'Vlad Popescu';
    $email = !empty($email) ? $email : 'vladpopescu2004@gmail.com';
    $mesaj = !empty($mesaj) ? $mesaj : 'Mesaj test!';
    $samariteanul = 'contact@gradinita-samariteanul-sibiu.ro';
    $type = !empty($type) ? $type : 'contact';

    $destinatari = ['gradinita_samariteanul@yahoo.ro', 'vladpopescu2004@gmail.com'];

    foreach ($destinatari as $destinatar) {
        $message = "
		Buna ziua, va contactez prin formularul de pe site-ul gradinita-samariteanul-sibiu.ro
		Tip email: $type
		Nume: " . ($type == 'inscriere' ? $parinte : $nume) . " 
		Email: $email 
		Telefon: $telefon

        
		Mesaj: " . ($type == 'inscriere' ? 'Doresc sa inscriu la gradinita copilul ' . $copil : $mesaj) . " 
		--------------------------------------------------------------
		gradinita-samariteanul-sibiu.ro

        ATENTIE! Daca vrei sa raspunzi, nu da reply la acest mail, pentru ca nu va merge! In schimb, copiaza adresa de email si compune un mesaj nou.
		";
        $mail = new PHPMailer();
        $mail->From     = $samariteanul;
        $mail->FromName = "Contact SAMARITEANUL: " . $samariteanul;
        $mail->IsSMTP();
        $mail->SMTPAuth = true;     // turn on SMTP authentication
        $mail->Username = $samariteanul;  // SMTP username
        $mail->Password = "Samariteanul123"; // SMTP password
        // $mail->SMTPSecure = "ssl"; // turn on SSL use
        $mail->Host = "localhost";
        $mail->Port = 25;
        // $mail->SMTPDebug  = 1; // Enables SMTP debug information (for testing, remove this line on production mode)
        // 1 = errors and messages
        // 2 = messages only
        $mail->Sender   =  $samariteanul;
        // $mail->ConfirmReadingTo  = "adresaReala@domeniulDumneavoastra.ro";
        // $mail->IsHTML(true); //turn on to send html email

        //add image - begin
        //$mail->AddEmbeddedImage('test.jpg', 'logoimg', 'test.jpg');
        //add image - end
        $mail->Subject = "Contact de pe GRADINITA-SAMARITEANUL-SIBIU.RO";
        // use this if you want to use image
        // $mail->Body     =  "Acest email a fost trimis folosind phpmailer - <img src=\"cid:logoimg\" />";
        $mail->Body     =  $message;

        $mail->AddAddress($destinatar);
        // $mail->AddBCC("adresaBCC@domain.ro");
        if ($mail->Send()) {
            $mail->ClearAddresses();
            $return_msg = '<span class="ok">Am primit mailul dvs. Vom răspunde în cel mai scurt timp!</span>';
        } else {
            $return_msg = '<span class="not_ok">Ceva nu a mers cum trebuie. Vă rugăm încercați din nou peste catva timp, sau dați-ne un telefon. Mulțumim!</span>';
        }
    }
    echo $return_msg;
}
