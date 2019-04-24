package security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
	
	@Override
	public void addViewControllers(ViewControllerRegistry reg) {
		reg.addViewController("/baraja").setViewName("home");
		reg.addViewController("/").setViewName("home");
		reg.addViewController("/hello").setViewName("hello");
		reg.addViewController("/login").setViewName("login");
	}
	
}
