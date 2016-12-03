package erdemc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
public class SpringAngularDeneme1ApplicationConfig extends WebSecurityConfigurerAdapter {
	
	static String REALM="MY_TEST_REALM";
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
		.ldapAuthentication()
		.userSearchFilter("uid={0}")
		.groupSearchBase("ou=groups")
		.groupSearchFilter("member={0}")
		.contextSource()
		.url("ldap://localhost:389/dc=erdemc,dc=deneme")
		.managerDn("cn=admin,dc=erdemc,dc=deneme")
		.managerPassword("invader84;");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
        .authorizeRequests()
        .antMatchers("/**").authenticated()
        .and().httpBasic().realmName(REALM).authenticationEntryPoint(authEntryPoint())
        .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}
	
	@Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
    }
	
	@Bean
	public PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public BasicAuthenticationEntryPoint authEntryPoint() {
		return new CustomBasicAuthenticationEntryPoint();
	}
	
}
