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
            @RequestBody Object fromValues
    ) {

        // Log or process the form data as needed
//        System.out.println("Received form data - Name: " + name + ", ID: " + id + ", Age: " + age);
//        System.out.println("received");
        // Read JSON data from file
        try {
//            ClassPathResource resource = new ClassPathResource("data.json");
//            String jsonContent = new String(Files.readAllBytes(resource.getFile().toPath()));
            String jsonContent = "{\n" +
                    "  \"exam\": {\n" +
                    "    \"id\": 3,\n" +
                    "    \"name\": \"united1\",\n" +
                    "    \"duration\": 0.25,\n" +
                    "    \"questionSize\": 10,\n" +
                    "    \"color\": \"#fb923c\",\n" +
                    "    \"taken\": false,\n" +
                    "    \"score\": null,\n" +
                    "    \"examDurationAuto\": false,\n" +
                    "    \"allowNegativeMarking\": true,\n" +
                    "    \"isExamDurationInfinite\": false\n" +
                    "  },\n" +
                    "  \"questions\": [\n" +
                    "    {\n" +
                    "      \"id\": 31,\n" +
                    "      \"question\": \"What is the nickname of Manchester United Football Club?\",\n" +
                    "      \"optionA\": \"The Blues\",\n" +
                    "      \"optionB\": \"The Gunners\",\n" +
                    "      \"optionC\": \"The Red Devils\",\n" +
                    "      \"optionD\": \"The Citizens\",\n" +
                    "      \"selected\": null,\n" +
                    "      \"options\": [\n" +
                    "        \"The Blues\",\n" +
                    "        \"The Gunners\",\n" +
                    "        \"The Red Devils\",\n" +
                    "        \"The Citizens\"\n" +
                    "      ]\n" +
                    "    },\n" +
                    "    {\n" +
                    "      \"id\": 32,\n" +
                    "      \"question\": \"In what year did Manchester United change their name from Newton Heath LYR Football Club?\",\n" +
                    "      \"optionA\": \"1878\",\n" +
                    "      \"optionB\": \"1902\",\n" +
                    "      \"optionC\": \"1910\",\n" +
                    "      \"optionD\": \"1945\",\n" +
                    "      \"selected\": null,\n" +
                    "      \"options\": [\n" +
                    "        \"1878\",\n" +
                    "        \"1902\",\n" +
                    "        \"1910\",\n" +
                    "        \"1945\"\n" +
                    "      ]\n" +
                    "    },\n" +
                    "    {\n" +
                    "      \"id\": 33,\n" +
                    "      \"question\": \"How many top-flight league titles has Manchester United won domestically?\",\n" +
                    "      \"optionA\": \"18\",\n" +
                    "      \"optionB\": \"20\",\n" +
                    "      \"optionC\": \"22\",\n" +
                    "      \"optionD\": \"25\",\n" +
                    "      \"selected\": null,\n" +
                    "      \"options\": [\n" +
                    "        \"18\",\n" +
                    "        \"20\",\n" +
                    "        \"22\",\n" +
                    "        \"25\"\n" +
                    "      ]\n" +
                    "    },\n" +
                    "    {\n" +
                    "      \"id\": 34,\n" +
                    "      \"question\": \"Who was the manager of Manchester United appointed in 1945?\",\n" +
                    "      \"optionA\": \"Alex Ferguson\",\n" +
                    "      \"optionB\": \"Matt Busby\",\n" +
                    "      \"optionC\": \"José Mourinho\",\n" +
                    "      \"optionD\": \"George Best\",\n" +
                    "      \"selected\": null,\n" +
                    "      \"options\": [\n" +
                    "        \"Alex Ferguson\",\n" +
                    "        \"Matt Busby\",\n" +
                    "        \"José Mourinho\",\n" +
                    "        \"George Best\"\n" +
                    "      ]\n" +
                    "    },\n" +
                    "    {\n" +
                    "      \"id\": 35,\n" +
                    "      \"question\": \"What is the capacity of Manchester United's current stadium?\",\n" +
                    "      \"optionA\": \"Old Trafford\",\n" +
                    "      \"optionB\": \"Emirates Stadium\",\n" +
                    "      \"optionC\": \"Etihad Stadium\",\n" +
                    "      \"optionD\": \"Anfield\",\n" +
                    "      \"selected\": null,\n" +
                    "      \"options\": [\n" +
                    "        \"Old Trafford\",\n" +
                    "        \"Emirates Stadium\",\n" +
                    "        \"Etihad Stadium\",\n" +
                    "        \"Anfield\"\n" +
                    "      ]\n" +
                    "    },\n" +
                    "    {\n" +
                    "      \"id\": 36,\n" +
                    "      \"question\": \"How many UEFA Champions League titles has Manchester United won?\",\n" +
                    "      \"optionA\": \"1\",\n" +
                    "      \"optionB\": \"2\",\n" +
                    "      \"optionC\": \"3\",\n" +
                    "      \"optionD\": \"4\",\n" +
                    "      \"selected\": null,\n" +
                    "      \"options\": [\n" +
                    "        \"1\",\n" +
                    "        \"2\",\n" +
                    "        \"3\",\n" +
                    "        \"4\"\n" +
                    "      ]\n" +
                    "    },\n" +
                    "    {\n" +
                    "      \"id\": 37,\n" +
                    "      \"question\": \"Who were the star players around whom Matt Busby rebuilt the team after the Munich air disaster?\",\n" +
                    "      \"optionA\": \"Eric Cantona, Ryan Giggs, Paul Scholes\",\n" +
                    "      \"optionB\": \"George Best, Denis Law, Bobby Charlton\",\n" +
                    "      \"optionC\": \"Wayne Rooney, Cristiano Ronaldo, Ji-Sung Park\",\n" +
                    "      \"optionD\": \"David Beckham, Roy Keane, Gary Neville\",\n" +
                    "      \"selected\": null,\n" +
                    "      \"options\": [\n" +
                    "        \"Eric Cantona, Ryan Giggs, Paul Scholes\",\n" +
                    "        \"George Best, Denis Law, Bobby Charlton\",\n" +
                    "        \"Wayne Rooney, Cristiano Ronaldo, Ji-Sung Park\",\n" +
                    "        \"David Beckham, Roy Keane, Gary Neville\"\n" +
                    "      ]\n" +
                    "    },\n" +
                    "    {\n" +
                    "      \"id\": 38,\n" +
                    "      \"question\": \"In which year did Manchester United achieve the continental treble under Alex Ferguson?\",\n" +
                    "      \"optionA\": \"1999–00\",\n" +
                    "      \"optionB\": \"1997–98\",\n" +
                    "      \"optionC\": \"1998–99\",\n" +
                    "      \"optionD\": \"2000–01\",\n" +
                    "      \"selected\": null,\n" +
                    "      \"options\": [\n" +
                    "        \"1999–00\",\n" +
                    "        \"1997–98\",\n" +
                    "        \"1998–99\",\n" +
                    "        \"2000–01\"\n" +
                    "      ]\n" +
                    "    },\n" +
                    "    {\n" +
                    "      \"id\": 39,\n" +
                    "      \"question\": \"Which manager led Manchester United to win the UEFA Europa League in the 2016-17 season?\",\n" +
                    "      \"optionA\": \"Alex Ferguson\",\n" +
                    "      \"optionB\": \"Matt Busby\",\n" +
                    "      \"optionC\": \"David Moyes\",\n" +
                    "      \"optionD\": \"José Mourinho\",\n" +
                    "      \"selected\": null,\n" +
                    "      \"options\": [\n" +
                    "        \"Alex Ferguson\",\n" +
                    "        \"Matt Busby\",\n" +
                    "        \"David Moyes\",\n" +
                    "        \"José Mourinho\"\n" +
                    "      ]\n" +
                    "    },\n" +
                    "    {\n" +
                    "      \"id\": 40,\n" +
                    "      \"question\": \"What significant achievement did Manchester United reach by winning the UEFA Europa League in 2016-17?\",\n" +
                    "      \"optionA\": \"Completing a domestic treble\",\n" +
                    "      \"optionB\": \"Winning all UEFA club competitions\",\n" +
                    "      \"optionC\": \"First English club to win FIFA Club World Cup\",\n" +
                    "      \"optionD\": \"Winning the Intercontinental Cup\",\n" +
                    "      \"selected\": null,\n" +
                    "      \"options\": [\n" +
                    "        \"Completing a domestic treble\",\n" +
                    "        \"Winning all UEFA club competitions\",\n" +
                    "        \"First English club to win FIFA Club World Cup\",\n" +
                    "        \"Winning the Intercontinental Cup\"\n" +
                    "      ]\n" +
                    "    }\n" +
                    "  ]\n" +
                    "}";
            ObjectMapper mapper = new ObjectMapper();
            Object jsonData = mapper.readValue(jsonContent, Object.class);

            return ResponseEntity.ok(jsonData);
        } catch (IOException e) {
//            e.printStackTrace();
            System.out.println(fromValues.toString());
            System.out.println("error reading json");
            return ResponseEntity.internalServerError().body("Error reading JSON file");
        }
    }
}