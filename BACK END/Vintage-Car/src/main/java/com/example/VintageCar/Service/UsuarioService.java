package com.example.VintageCar.Service;

//import com.example.VintageCar.Email.EmailService;
import com.example.VintageCar.Email.EmailService;
import com.example.VintageCar.Entities.Reserva;
import com.example.VintageCar.Entities.Rol;
import com.example.VintageCar.Entities.Usuario;
import com.example.VintageCar.Exception.BadRequestException;
import com.example.VintageCar.Exception.ResourceNotFoundException;
import com.example.VintageCar.Repository.UsuarioRepository;
import net.bytebuddy.utility.RandomString;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

//implements UserDetailsService
@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    private final RolService rolService;
    private final JavaMailSender mailSender;


    private static final Logger logger = Logger.getLogger(Reserva.class);
    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository, RolService rolService, EmailService emailService, JavaMailSender mailSender) {
        this.usuarioRepository = usuarioRepository;
        this.rolService = rolService;
        this.mailSender = mailSender;
    }

    private void sendVerificationEmail(Usuario usuario, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String toAddress = usuario.getEmail();
        String fromAddress = "vintagecarsdh@gmail.com";
        String senderName = "Vintage Cars";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Vintage Cars.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", usuario.getUsername());
        String verifyURL = siteURL + "/verify?code=" + usuario.getCodigoVerificacion();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);
    }

    public boolean verify(String verificationCode) {
        logger.info("Buscando usuario"+verificationCode);
        Usuario usuario = usuarioRepository.encontarUsuarioPorCodigoVerificacion(verificationCode);

        if (usuario == null || usuario.getHabilitado()==true ) {
            return false;
        } else {
            logger.info("Hay usuario");
            usuario.setCodigoVerificacion(null);
            usuario.setHabilitado(true);
            usuarioRepository.save(usuario);
            return true;
        }

    }
    public Usuario buscarUsuarioPorId(Long id) {
        logger.info("Buscando usuario id: " + id);
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        Usuario usuario1 = null;
        if (usuario.isPresent()) {
            usuario1 = usuario.get();
        }
        return usuario1;
    }

    public List<Usuario> buscarTodasUsuarios() {
        logger.info("Buscando todas las Usuarios");
        return usuarioRepository.findAll();
    }

    public Usuario cargarUsuario(Usuario usuario,String siteUrl) throws BadRequestException, MessagingException, UnsupportedEncodingException {
        logger.info("Verificamos que no haya otro usuario con el mismo mail y que el rol existe");
        Rol rol = rolService.buscarRolPorId(usuario.getRol().getId());
        Optional<Usuario> usuarioBuscado =usuarioRepository.findUsuarioByEmail(usuario.getEmail());
        if(usuarioBuscado.isEmpty()&&rol!=null){
            logger.info("Cargamos la usuario");
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String password = passwordEncoder.encode(usuario.getPassword());
            usuario.setPassword(password);
            String randomCode = RandomString.make(64);
            usuario.setCodigoVerificacion(randomCode);
            usuario.setHabilitado(false);
            usuario.setRol(rol);
            sendVerificationEmail(usuario,siteUrl);
            return usuarioRepository.save(usuario);
        }
        throw new BadRequestException("Ya existe un usuario con este mail o el rol no existe");
    }

    public Optional<Usuario> buscarUsuarioPorEmail(String email){
        logger.info("Buscando usuario email: " + email);
        return usuarioRepository.findUsuarioByEmail(email);
    }
    public void eliminarUsuario(Long id) throws ResourceNotFoundException {
        Usuario usuario = buscarUsuarioPorId(id);
        if (usuario != null) {
            logger.info("Lo encontramos, entonces lo eliminamos");
            usuarioRepository.deleteById(id);
        } else {
            logger.error("No existe el usuario con id= " + id);
            throw new ResourceNotFoundException("No existe el usuario con id= " + id);
        }
    }

}
