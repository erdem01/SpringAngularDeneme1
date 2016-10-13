package erdemc.controller;

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
		return user;
	}
	
}
