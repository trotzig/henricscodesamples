package trotzig;

import taco.Controller;
import trotzig.models.Account;

public class Router extends taco.Router {

	@Override
	public void init() {
		route("/").through(TwitterImageController.class).renderedBy("/WEB-INF/tweetsandimages.jsp");
		
		route("/collect").through(URLCollectController.class).renderAsJson();
		route("/bootstrap").through(BootStrap.class).renderAsJson();
		
	}
	
	
	public static class BootStrap implements Controller<Void> {
		
		@Override
		public Void execute() {
			createAccount("henric", "henric.trotzig@gmail.com");
			createAccount("adam", "adam@causes.com");
			return null;
		}
		
		private void createAccount(String name, String email) {
			Account account = new Account();
			account.setEmail(email);
			account.setName(name);
			account.save();
		}
	}

}
