const express = require('express');
const multer = require('multer');
const xlsx2mongo = require('xlsx-mongo');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Set the destination directory for uploaded files

app.post('/import', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;

    const collectionName = req.body.collectionName || path.basename(filePath, '.xlsx'); // Use the file name as the collection name if not specified
    await xlsx2mongo.init(filePath); // Initialize xlsx-mongo with the Excel file path

    mongoose.connect(req.body.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

    // Import data from the Excel file to the specified collection
    await xlsx2mongo.import(collectionName);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('Imported xlsx file deleted successfully');
      }
    });

    res.status(200).json({ message: 'Data imported successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during data import' });
  }
});

app.post('/add', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const pathmain = req.body.path;

    mongoose.connect(req.body.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

    let collectionName = req.body.collectionName || path.basename(filePath, '.xlsx'); // Use the file name as the collection name if not specified

    await xlsx2mongo.init(pathmain);
    await xlsx2mongo.add(collectionName, pathmain);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('Imported xlsx file deleted successfully');
      }
    });

    res.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during data import' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;