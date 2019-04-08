package pojos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface BarajaRepository extends CrudRepository<Baraja, Integer>{

}
