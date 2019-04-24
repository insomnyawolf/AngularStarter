package security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    public void addViewControllers(ViewControllerRegistry registry) {
    	System.out.println("lol");
        registry.addViewController("/baraja").setViewName("baraja");
        registry.addViewController("/").setViewName("baraja");
        registry.addViewController("/login").setViewName("login");
    }

}
