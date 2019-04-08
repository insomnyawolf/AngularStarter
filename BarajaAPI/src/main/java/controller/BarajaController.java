package controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import pojos.Baraja;
import pojos.BarajaRepository;

@CrossOrigin
@RestController
public class BarajaController {

	@Autowired
	private BarajaRepository br;

	@CrossOrigin
	@GetMapping("/baraja")
	public Iterable<Baraja> getBarajas() {
		return br.findAll();
	}

	@CrossOrigin
	@PostMapping("/baraja")
	public String addBaraja(@RequestBody Baraja baraja) {
		br.save(baraja);
		return "Added";
	}

	@CrossOrigin
	@PutMapping("/baraja/{id}")
	public String editBaraja(@RequestBody Baraja baraja, @PathVariable(value = "id") Integer id) {
		if (!br.existsById(id)) {
			return "Esa Baraja NO existe";
		}
		try {
			Optional<Baraja> opCan = br.findById(id);
			if (!opCan.isPresent()) {
				return "Introduce valores";
			}
			Baraja nBaraja = opCan.get();
			if (baraja.getNombre() != null) {
				nBaraja.setNombre(baraja.getNombre());
			}
			if (baraja.getCantidadCartas() != null) {
				nBaraja.setCantidadCartas(baraja.getCantidadCartas());
			}
			if (baraja.getMarca() != null) {
				nBaraja.setMarca(baraja.getMarca());
			}
			br.save(nBaraja);
			return "Saved";
		} catch (Exception e) {
			return e.getMessage();
		}
	}

	@CrossOrigin
	@DeleteMapping("/baraja/{id}")
	public String deleteBaraja(@PathVariable(value = "id") Integer id) {
		if (!(br.existsById(id))) {
			return "Esa Baraja NO existe";
		}
		br.deleteById(id);
		return "Deleted";
	}

}
