package com.ravenclaw.harmony.model.enumerate;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
USER(Set.of(Permissions.USER_CREATE,Permissions.USER_READ,Permissions.USER_DELETE,Permissions.USER_UPDATE)),
ADMIN(Set.of(
		Permissions.ADMIN_CREATE,Permissions.ADMIN_DELETE,Permissions.ADMIN_READ,Permissions.ADMIN_UPDATE
		)),

;
	@Getter
	private final Set<Permissions> permissions;
	
	public List<SimpleGrantedAuthority> getAuthoritites(){
	var authorities=getPermissions()
		.stream()
		.map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
		.collect(Collectors.toList());
	authorities.add(new SimpleGrantedAuthority("ROLE_"+this.name()));
	return authorities;
	}
}

