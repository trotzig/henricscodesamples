package trotzig;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import taco.Controller;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class TwitterImageController implements Controller<List<TweetAndImage>> {

	@Setter @Getter
	private String screenName = "twitterapi";
	
	
	@Override
	public List<TweetAndImage> execute() {

		List<Tweet> tweets = findTweets(this.screenName);
		List<TweetAndImage> result = new ArrayList<TweetAndImage>();
		for (Tweet tweet : tweets) {
			TweetAndImage tai = new TweetAndImage();
			tai.setTweet(tweet.getText());
			String imageUrl = findImageUrl(tweet.getText());
			tai.setImageUrl(imageUrl);
			result.add(tai);
		}
		return result;
	}

	protected String findImageUrl(String text) {
		try {
			StringBuilder sb = new StringBuilder();
			String[] split = text.split(" ");
			for (String token : split) {
				if (token.matches("^[a-zåäöA-ZÅÄÖ]+$")) {
					if (sb.length() > 0) {
						sb.append(" ");
					}
					sb.append(token);
				}
			}
			String urlStr = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + URLEncoder.encode(sb.toString(), "UTF-8");
			
			URL url = new URL(urlStr);
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					url.openStream()));

			ImageResult result = new Gson().fromJson(reader, ImageResult.class);
			reader.close();
			List<Image> images = result.getResponseData().getResults();
			if (images == null || images.isEmpty()) {
				return null;
			}
			return images.get(0).getTbUrl();

		} catch (MalformedURLException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	protected List<Tweet> findTweets(String screenName) {
		try {
			String urlStr = "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name=" + URLEncoder.encode(screenName, "UTF-8") + "&count=3";
			URL url = new URL(urlStr);
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					url.openStream()));

			List<Tweet> tweets = new Gson().fromJson(reader,
					new TypeToken<List<Tweet>>() {
					}.getType());
			reader.close();
			return tweets;

		} catch (MalformedURLException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Data
	static class ImageResult {
		ImageResponseData responseData;
	}
	@Data
	static class ImageResponseData {
		List<Image> results;
	}
}
