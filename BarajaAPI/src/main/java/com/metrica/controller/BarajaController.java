package com.metrica.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.metrica.pojos.Baraja;
import com.metrica.pojos.BarajaRepository;

@RestController
public class BarajaController {

	@Autowired
	private BarajaRepository br;

	@CrossOrigin
	@GetMapping("/getBarajas")
	public Iterable<Baraja> getBarajas() {
		return br.findAll();
	}

	@CrossOrigin
	@PostMapping("/addBaraja")
	public String addBaraja(@RequestBody Baraja baraja) {
		br.save(baraja);
		return "Added";
	}

	@CrossOrigin
	@PutMapping("/editBaraja/{id}")
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
	@DeleteMapping("/deleteBaraja/{id}")
	public String deleteBaraja(@PathVariable(value = "id") Integer id) {
		if (!(br.existsById(id))) {
			return "Esa Baraja NO existe";
		}
		br.deleteById(id);
		return "Deleted";
	}

}
