package erdemc.controller;

import java.util.Date;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import erdemc.model.User;

@RestController
public class WebServiceController {

	@ResponseBody
	@RequestMapping(value="/user", method=RequestMethod.GET)
	public User gatherUser() {
		final User user = new User();
		user.setName("erdem");
		user.setSurname("Caglayan");
		user.setBirthday(new Date());
		return user;
	}
	
	@RequestMapping(value="/user", method=RequestMethod.POST)
	public void gatherUser(@RequestBody User user) {
		System.out.println(user.getName());
		System.out.println(user.getSurname());
		System.out.println(user.getBirthday());
	}
	
}
