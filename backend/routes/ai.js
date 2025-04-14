// backend/routes/ai.js
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const upload = multer({ dest: 'media/' });

router.post('/upload-files', upload.fields([
  { name: 'pyq' }, { name: 'syllabus' }, { name: 'book' }
]), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('pyq', fs.createReadStream(req.files['pyq'][0].path));
    formData.append('syllabus', fs.createReadStream(req.files['syllabus'][0].path));
    formData.append('book', fs.createReadStream(req.files['book'][0].path));

    const response = await axios.post('http://localhost:8000/analyze', formData, {
      headers: formData.getHeaders()
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Analysis failed');
  }
});

module.exports = router;
