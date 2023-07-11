const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const mongoose = require('mongoose');

const path = require('path');
const filePath = path.join(__dirname, 'Test.xlsx');

require('dotenv').config();

const importFile = async () => {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream('Test.xlsx'));
    formData.append('mongoURL', process.env.MONGO_URL);
    formData.append('collectionName', 'test3');

    const response = await axios.post('http://localhost:3000/import', formData, {
      headers: formData.getHeaders(),
    });

    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

importFile();

// const addData = async () => {
//   try {
//     const formData = new FormData();
//     formData.append('file', fs.createReadStream('Test.xlsx'));
//     formData.append('path', filePath);
//     formData.append('collectionName', 'test2');
//     formData.append('mongoURL', process.env.MONGO_URL);

//     const response = await axios.post('http://localhost:3000/add', formData, {
//       headers: formData.getHeaders(),
//     });

//     console.log(response.data);
//   } catch (error) {
//     console.error(error.response.data);
//   }
// };

// addData();

