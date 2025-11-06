package com.klef.controller;

import com.klef.entity.Car;
import com.klef.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/carapi")
@CrossOrigin(origins = "*")
public class CarController {

    @Autowired
    private CarService service;

    @PostMapping("/add")
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
        Car saved = service.addCar(car);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Car>> getAllCars() {
        return new ResponseEntity<>(service.getAllCars(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getCarById(@PathVariable int id) {
        Car car = service.getCarById(id);
        if (car != null)
            return new ResponseEntity<>(car, HttpStatus.OK);
        else
            return new ResponseEntity<>("Car not found", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCar(@PathVariable int id, @RequestBody Car car) {
        Car existing = service.getCarById(id);
        if (existing != null) {
            car.setId(id);
            return new ResponseEntity<>(service.updateCar(car), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot update. Car not found.", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCar(@PathVariable int id) {
        Car existing = service.getCarById(id);
        if (existing != null) {
            service.deleteCar(id);
            return new ResponseEntity<>("Car deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. Car not found.", HttpStatus.NOT_FOUND);
        }
    }
}