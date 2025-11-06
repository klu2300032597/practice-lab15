package com.klef.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "car_maintenance_table")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 100)
    private String carModel;

    @Column(nullable = false, length = 100)
    private String owner;

    @Column(nullable = false, length = 15)
    private String serviceDate;

    @Column(nullable = false, length = 200)
    private String issue;

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getCarModel() { return carModel; }
    public void setCarModel(String carModel) { this.carModel = carModel; }

    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }

    public String getServiceDate() { return serviceDate; }
    public void setServiceDate(String serviceDate) { this.serviceDate = serviceDate; }

    public String getIssue() { return issue; }
    public void setIssue(String issue) { this.issue = issue; }
}