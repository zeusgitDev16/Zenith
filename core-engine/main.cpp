#include <iostream>
#include <string>

// Simple helper function to extract values from a JSON string 
// (Keeps us dependency-free while you are learning C++)
std::string extractJsonField(const std::string& json, const std::string& key) {
    std::string searchKey = "\"" + key + "\":";
    size_t startPos = json.find(searchKey);
    if (startPos == std::string::npos) return "";
    
    startPos += searchKey.length();
    // Skip spaces and opening quotes
    while (startPos < json.length() && (json[startPos] == ' ' || json[startPos] == '\"')) {
        startPos++;
    }
    
    size_t endPos = startPos;
    while (endPos < json.length() && json[endPos] != '\"' && json[endPos] != ',' && json[endPos] != '}') {
        endPos++;
    }
    
    return json.substr(startPos, endPos - startPos);
}

int main() {
    // 1. Read the incoming registration payload sent by Express via Standard Input
    std::string inputJson;
    if (std::getline(std::cin, inputJson)) {
        
        // 2. Extract specific fields for core processing
        std::string email = extractJsonField(inputJson, "email");
        std::string type = extractJsonField(inputJson, "type");

        // 3. Core Engine Business Logic / Simulated Database Check
        if (email == "taken@zenith.com") {
            // Return failure JSON to output stream
            std::cout << "{\"success\": false, \"error\": \"Email already exists in C++ Core DB.\"}" << std::endl;
            return 1; // Exit code 1 indicates an error
        }

        // 4. Return success JSON back up to the Express server
        std::cout << "{\"success\": true, \"message\": \"Account registered successfully via Zenith C++ Core\", \"data\": {\"email\": \"" << email << "\", \"type\": \"" << type << "\"}}" << std::endl;
        return 0; // Exit code 0 indicates success
    }

    // Fallback if no input was received
    std::cout << "{\"success\": false, \"error\": \"No input stream received.\"}" << std::endl;
    return 1;
}