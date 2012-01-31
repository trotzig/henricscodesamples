package trotzig.models;

import lombok.Getter;
import lombok.Setter;
import siena.Generator;
import siena.Id;
import siena.Model;
public class Log extends Model {
	
	@Id(Generator.AUTO_INCREMENT)
	@Getter
	private Long id;

	@Setter @Getter
	private String message;
	
	
	public Log(String message) {
		this.message = message;
	}
	
	public Log() {
		// TODO Auto-generated constructor stub
	}
	
}
