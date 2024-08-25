package com.du.yiit.examReady.test;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.ClassPathResource;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.file.Files;

@RestController
@RequestMapping("/api")
public class FormController {

    @PostMapping("/submit-form")
    public ResponseEntity<Object> submitForm(
            @RequestBody FromValues fromValues
    ) {

        // Log or process the form data as needed
//        System.out.println("Received form data - Name: " + name + ", ID: " + id + ", Age: " + age);
        System.out.println("received");
        // Read JSON data from file
        try {
            ClassPathResource resource = new ClassPathResource("data.json");
            String jsonContent = new String(Files.readAllBytes(resource.getFile().toPath()));

            ObjectMapper mapper = new ObjectMapper();
            Object jsonData = mapper.readValue(jsonContent, Object.class);

            return ResponseEntity.ok(jsonData);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error reading JSON file");
        }
    }
}