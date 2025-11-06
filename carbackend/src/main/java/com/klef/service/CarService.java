package com.klef.service;

import com.klef.entity.Car;

import java.util.List;

public interface CarService {

    Car addCar(Car car);
    List<Car> getAllCars();
    Car getCarById(int id);
    Car updateCar(Car car);
    void deleteCar(int id);

}