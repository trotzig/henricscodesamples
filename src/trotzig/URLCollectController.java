package trotzig;

import java.io.IOException;

import lombok.Setter;
import taco.Controller;
import trotzig.models.Account;

import com.google.appengine.api.mail.MailService.Message;
import com.google.appengine.api.mail.MailServiceFactory;

public class URLCollectController implements Controller<String> {

	@Setter
	private String url;
	
	@Setter 
	private String account;
	
	@Setter
	private String title;
	
	
	@Override
	public String execute() {
		Account dbaccount = Account.getByName(account);
		sendEmail(dbaccount);
		return "URL saved for " + dbaccount.getEmail();
	}
	
	private void sendEmail(Account dbaccount) {
		try {
			Message msg = new Message("henric.trotzig@gmail.com", dbaccount.getEmail(), title, url);
			MailServiceFactory.getMailService().send(msg);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

}
