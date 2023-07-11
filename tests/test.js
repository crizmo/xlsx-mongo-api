const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

require('dotenv').config();

// const importFile = async () => {
//   try {
//     const formData = new FormData();
//     formData.append('file', fs.createReadStream('Test.xlsx'));
//     formData.append('mongoURL', process.env.MONGO_URL);
//     formData.append('collectionName', 'test');

//     const response = await axios.post('https://xlsxmongoapi.kurizu.repl.co/import', formData, {
//       headers: formData.getHeaders(),
//     });

//     console.log(response.data);
//   } catch (error) {
//     console.error(error.response.data);
//   }
// };

// importFile();

const addData = async () => {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream('Test.xlsx'));
    formData.append('mongoURL', process.env.MONGO_URL);
    formData.append('collectionName', 'test');

    const response = await axios.post('https://xlsxmongoapi.kurizu.repl.co/add', formData, {
      headers: formData.getHeaders(),
    });

    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

addData();
