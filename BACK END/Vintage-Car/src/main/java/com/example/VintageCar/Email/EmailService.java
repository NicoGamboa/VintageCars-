package com.example.VintageCar.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void send( String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("vintagecarsdh@gmail.com");
        message.setTo(to);
        message.setSubject("Creacion de cuenta");
        message.setText("Su cuenta ha sido creada con exito");
        mailSender.send(message);
    }


}
