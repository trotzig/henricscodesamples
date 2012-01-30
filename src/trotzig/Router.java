package trotzig;

public class Router extends taco.Router {

	@Override
	public void init() {
		route("/").through(TwitterImageController.class).renderedBy("/WEB-INF/tweetsandimages.jsp");
	}

}
