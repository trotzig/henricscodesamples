package trotzig;

import java.util.List;

import junit.framework.Assert;

import org.junit.Test;


public class TwitterImageTest {

	
	@Test
	public void test() {
		TwitterImageController ctrler = new TwitterImageController();
		List<TweetAndImage> result = ctrler.execute();
		Assert.assertNotNull(result.get(0).getImageUrl());
		Assert.assertNotNull(result.get(0).getTweet());
	}
	
	
	
	@Test
	public void testMultipleUsers() {
		
		testOneUser("henrictrotzig");
		testOneUser("emmabrink");
		testOneUser("greg");
		
		
	}
	

	private void testOneUser(String screenName) {

		TwitterImageController ctrler = new TwitterImageController();
		ctrler.setScreenName(screenName);
		List<TweetAndImage> result = ctrler.execute();
		
		Assert.assertNotNull(result);
		
	}
	
	
}
