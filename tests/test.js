const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();

const uploadFile = async () => {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream('Test.xlsx'));
    formData.append('mongoURL', process.env.MONGO_URL);
    formData.append('collectionName', 'test');

    const response = await axios.post('http://localhost:3000/upload', formData, {
      headers: formData.getHeaders(),
    });

    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

uploadFile();
