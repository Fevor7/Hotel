package by.htp.itacademy.hotel.domain.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Fields of this class contain description of the hotel
 * 
 * @author viktor
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "main_hotel")
public class Hotel implements Serializable {

	private static final long serialVersionUID = 2664535142026306731L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String address;
	private String location;
	private String about;
	private String starReting;
	@OneToMany
	@JoinColumn(name = "id_hotel")
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<FacilitiesHotel> facilities;
	@OneToMany
	@JoinColumn(name = "id_hotel")
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<FotoAddressHotel> fotoAddress;

}
