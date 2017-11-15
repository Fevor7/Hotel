package by.htp.itacademy.hotel.domain.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The object of this class will store customer requests.
 * 
 * @author Viktor
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="order_table")
public class Order implements Serializable {

	private static final long serialVersionUID = 3809323129288556367L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderId;
	@OneToOne
	@JoinColumn(name="id_room")
	private Room room;
	@OneToOne
	@JoinColumn(name="id_user")
	private User user;
	private Date dateStart;
	private Date dateEnd;
	private Byte bedNumber;
	private Byte personNumber;
	@OneToOne
	@JoinColumn(name="id_typeRoom")
	private TypeRoom typeRoom;
	private BigDecimal minPrice;
	private BigDecimal maxPrice;
	private BigDecimal totalAmount;
	@OneToOne
	@JoinColumn(name="id_status")
	private StatusOrder orderStatus;
	private Integer pageNumber;

	public Order(String status) {
		this.orderStatus = new StatusOrder(null, status);
	}

	public Order(Long orderId) {
		this.orderId = orderId;
	}

	public Order(Long orderId, String status) {
		this.orderId = orderId;
		this.orderStatus = new StatusOrder(null,status);
	}

	public Order(Long idStatus, Integer pageNumber) {
		this.orderStatus = new StatusOrder(idStatus, null);
		this.pageNumber = pageNumber;
	}

	public Order(Date dateStart, Date dateEnd, Byte bedNumber, Byte personNumber, Long idTypeRoom, Long userId,
			Long idStatus) {
		super();
		this.user = new User(userId);
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.bedNumber = bedNumber;
		this.personNumber = personNumber;
		this.typeRoom = new TypeRoom(idTypeRoom, null);
		this.orderStatus = new StatusOrder(idStatus, null);
	}

	public Order(Date dateStart, Date dateEnd, Byte bedNumber, Byte personNumber, BigDecimal minPrice,
			BigDecimal maxPrice, Long idTypeRoom) {
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.bedNumber = bedNumber;
		this.personNumber = personNumber;
		this.minPrice = minPrice;
		this.maxPrice = maxPrice;
		this.typeRoom = new TypeRoom(idTypeRoom, null);
	}

	public Order(Long id, Date dateStart, Date dateEnd, Byte bedNumber, Long idTypeRoom, Byte personNumber) {
		this.orderId = id;
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.bedNumber = bedNumber;
		this.personNumber = personNumber;
		this.typeRoom = new TypeRoom(idTypeRoom, null);
	}

	public Order(Long id, Long numberRoom, Date dateStrart, Date dateEnd, Byte bedNumber, Byte personNumber,
			Long idTypeRoom, BigDecimal totalAmount, Long idStatus) {
		this.orderId = id;
		this.room = new Room(null, numberRoom);
		this.dateStart = dateStrart;
		this.dateEnd = dateEnd;
		this.bedNumber = bedNumber;
		this.personNumber = personNumber;
		this.typeRoom = new TypeRoom(idTypeRoom, null);
		this.totalAmount = totalAmount;
		this.orderStatus = new StatusOrder(idStatus, null);
	}

	public Order(Long id, Long numberRoom, String userLogin, Date dateStrart, Date dateEnd, Byte bedNumber,
			Byte personNumber, String typeRoom, Long idTypeRoom, BigDecimal totalAmount, String status, Long idStatus) {
		this.orderId = id;
		this.room = new Room(null, numberRoom);
		this.user = new User(userLogin);
		this.dateStart = dateStrart;
		this.dateEnd = dateEnd;
		this.bedNumber = bedNumber;
		this.personNumber = personNumber;
		this.typeRoom = new TypeRoom(idTypeRoom, typeRoom);
		this.totalAmount = totalAmount;
		this.orderStatus = new StatusOrder(idStatus, status);
	}

	public Order(Long orderId, Long roomId, Date dateStart, Date dateEnd, Byte bedNumber, Byte personNumber,
			Long idTypeRoom, Long idStatus, BigDecimal totalAmount) {
		this.orderId = orderId;
		this.room = new Room(roomId, null);
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.bedNumber = bedNumber;
		this.personNumber = personNumber;
		this.typeRoom = new TypeRoom(idTypeRoom, null);
		this.orderStatus = new StatusOrder(idStatus, null);
		this.totalAmount = totalAmount;
	}

	public Order(Date dateStart, Date dateEnd, Byte bedNumber, Byte personNumber, Long idTypeRoom, Integer pageNumber) {
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.bedNumber = bedNumber;
		this.personNumber = personNumber;
		this.typeRoom = new TypeRoom(idTypeRoom, null);
		this.pageNumber = pageNumber;
	}

    public Order(Date start, Date end, Byte bed, Byte person, BigDecimal min, BigDecimal max, Integer page) {
        this.dateStart = start;
        this.dateEnd = end;
        this.bedNumber = bed;
        this.personNumber = person;
        this.minPrice = min;
        this.maxPrice = max;
        this.pageNumber = page;
	}
}
