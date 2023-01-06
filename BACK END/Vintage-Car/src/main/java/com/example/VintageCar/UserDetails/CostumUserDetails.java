package com.example.VintageCar.UserDetails;

import com.example.VintageCar.Entities.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class CostumUserDetails implements UserDetails {

    private Usuario usuario;

    @Autowired
    public CostumUserDetails(Usuario usuario) {
        this.usuario = usuario;
    }


    @Override
    public boolean isEnabled() {
        return usuario.isEnabled();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

}
