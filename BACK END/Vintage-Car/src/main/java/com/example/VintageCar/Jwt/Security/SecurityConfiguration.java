package com.example.VintageCar.Jwt.Security;

import com.example.VintageCar.Jwt.Filter.JwtRequestFilter;
import com.example.VintageCar.Jwt.Service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(myUserDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests().antMatchers("/authenticate")
                .permitAll()
                .antMatchers("/usuario/**").permitAll()
                .antMatchers("/rol/**").permitAll()
                .antMatchers(HttpMethod.GET,"/caracteristica**").permitAll()
                .antMatchers(HttpMethod.POST, "/caracteristica").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.PUT, "/caracteristica").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.DELETE, "/caracteristica/{id}").hasAuthority("ROLE_ADMIN")

                .antMatchers(HttpMethod.GET,"/categorias**").permitAll()
                .antMatchers(HttpMethod.POST, "/categorias").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.PUT, "/categorias").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.DELETE, "/categorias/{id}").hasAuthority("ROLE_ADMIN")

                .antMatchers(HttpMethod.GET,"/ciudad**").permitAll()
                .antMatchers(HttpMethod.POST, "/ciudad").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.PUT, "/ciudad").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.DELETE, "/ciudad/{id}").hasAuthority("ROLE_ADMIN")

                .antMatchers(HttpMethod.GET,"/imagen**").permitAll()
                .antMatchers(HttpMethod.POST, "/imagen").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.PUT, "/imagen").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.DELETE, "/imagen/{id}").hasAuthority("ROLE_ADMIN")

                .antMatchers(HttpMethod.GET,"/politica**").permitAll()
                .antMatchers(HttpMethod.POST, "/politica").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.PUT, "/politica").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.DELETE, "/politica/{id}").hasAuthority("ROLE_ADMIN")

                .antMatchers(HttpMethod.GET,"/producto**").permitAll()
                .antMatchers(HttpMethod.POST, "/producto").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.PUT, "/producto").hasAuthority("ROLE_ADMIN")
                .antMatchers(HttpMethod.DELETE, "/producto/{id}").hasAuthority("ROLE_ADMIN")

                .antMatchers(HttpMethod.GET,"/reserva**").permitAll()
                .antMatchers(HttpMethod.POST, "/reserva").hasAnyAuthority("ROLE_ADMIN","ROLE_USER")
                .antMatchers(HttpMethod.PUT, "/reserva").hasAnyAuthority("ROLE_ADMIN","ROLE_USER")
                .antMatchers(HttpMethod.DELETE, "/reserva/{id}").hasAnyAuthority("ROLE_ADMIN","ROLE_USER")
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider provider= new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(myUserDetailsService);
        return provider;
    }
}
