const express = require('express');
const router = express.Router();
const { execFile } = require('child_process');
const path = require('path');

router.post('/register', (req, res) => {
  // 1. Get the payload sent from the React frontend
  const payload = req.body;
  const jsonString = JSON.stringify(payload);

  // 2. Define the absolute path to your compiled C++ executable
  // Adjust the path depending on where your backend folder sits relative to core-engine
  const enginePath = path.join(__dirname, '../../core-engine/core_engine.exe');

  // 3. Execute the C++ binary and pass the JSON payload via stdin
  const child = execFile(enginePath, (error, stdout, stderr) => {
    if (error) {
      console.error('C++ Core Execution Error:', error);
      return res.status(500).json({ success: false, error: 'Internal Core Engine Error' });
    }

    if (stderr) {
      console.error('C++ Core Stderr:', stderr);
    }

    try {
      // 4. Parse the JSON response coming out of the C++ binary and send to frontend
      const result = JSON.parse(stdout.trim());
      return res.status(result.success ? 200 : 400).json(result);
    } catch (parseError) {
      console.error('Failed to parse C++ output:', stdout);
      return res.status(500).json({ success: false, error: 'Invalid response from Core Engine' });
    }
  });

  // Write the payload into the C++ process's standard input stream
  child.stdin.write(jsonString);
  child.stdin.end();
});

module.exports = router;