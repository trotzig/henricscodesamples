package trotzig.models;

import lombok.Getter;
import lombok.Setter;
import siena.Generator;
import siena.Id;
import siena.Model;

public class Account extends Model {

	@Id(Generator.AUTO_INCREMENT)
	@Getter
	private Long id;
	
	@Getter
	@Setter
	private String name;
	
	@Getter
	@Setter
	private String email;
	
	public static Account getByName(String name) {
		return Model.all(Account.class).filter("name", name).get();
	}	
}
