package com.klef.service;

import com.klef.entity.Car;
import com.klef.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepository repository;

    @Override
    public Car addCar(Car car) {
        return repository.save(car);
    }

    @Override
    public List<Car> getAllCars() {
        return repository.findAll();
    }

    @Override
    public Car getCarById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Car updateCar(Car car) {
        return repository.save(car);
    }

    @Override
    public void deleteCar(int id) {
        repository.deleteById(id);
    }
}