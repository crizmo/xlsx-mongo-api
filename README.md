<div align="center">
  <h1>xlsx-mongo-api</h1>
  <p>A RESTful API for importing and adding data from XLSX files to MongoDB</p>
  <a href="https://github.com/crizmo/xlsx-mongo-api"><img src="https://img.shields.io/github/license/crizmo/xlsx-mongo-api?style=for-the-badge" alt="License"></a>
  <a href="https://github.com/crizmo/xlsx-mongo-api"><img src="https://img.shields.io/github/stars/crizmo/xlsx-mongo-api?style=for-the-badge" alt="Stars"></a>
  <a href="https://github.com/crizmo/xlsx-mongo-api"><img src="https://img.shields.io/github/issues/crizmo/xlsx-mongo-api?style=for-the-badge" alt="Issues"></a>
</div>

## About The Project
`xlsx-mongo-api` is a RESTful API built with Node.js and Express that allows you to import and add data from XLSX files to MongoDB. It serves as a convenient interface for utilizing the `xlsx-mongo` package.

## Features
- Import data from XLSX file to MongoDB
- Add data from XLSX file to existing MongoDB collection
- Dynamic generation of MongoDB schema based on XLSX file headers
- Configurable MongoDB connection URL and collection name
- Support for handling large XLSX files

## Getting Started
### Prerequisites
- Node.js and npm installed on your machine
- MongoDB server up and running
- XLSX files with data to import

### API Endpoints

1. POST /import
  - Description: Import data from an XLSX file to MongoDB
  - Request Parameters: <br>
      1. file (multipart/form-data): XLSX file to import <br>
      2. collectionName (optional): Name of the collection to import/add the data to.<br> If not provided, it will use the filename as the collection name.<br><br>
  - Response: JSON response with a success message or error message

2. POST /add
  - Description: Add data from an XLSX file to an existing MongoDB collection
  - Request Parameters: <br>
      1. file (multipart/form-data): XLSX file to import <br>
      2. collectionName (optional): Name of the collection to import/add the data to.<br> If not provided, it will use the filename as the collection name.<br><br>
  - Response: JSON response with a success message or error message

### Usage
1. Start the server by running npm start.

2. Send a POST request to https://xlsxmongoapi.kurizu.repl.co/import with the following parameters:

  1. file: The XLSX file to import.
  2. collectionName (optional): The name of the collection to import/add the data to.<br> If not provided, it will use the filename as the collection name.

3. Create a `.env` file in the root directory of the project and add the following environment variables:
```shell
   MONGO_URL=<your-mongodb-connection-url>
   MONGO_COLLECTION=<your-mongodb-collection-name>
```

Example using Axios:

```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const path = require('path');
const filePath = path.join('Test.xlsx');

require('dotenv').config();

// Import data from XLSX file to MongoDB
const importFile = async () => {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream('Test.xlsx'));
    formData.append('mongoURL', process.env.MONGO_URL);
    formData.append('collectionName', process.env.MONGO_COLLECTION);

    const response = await axios.post('https://xlsxmongoapi.kurizu.repl.co/import', formData, {
      headers: formData.getHeaders(),
    });

    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

importFile();

// Add data from XLSX file to existing MongoDB collection
const addData = async () => {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream('Test.xlsx'));
    formData.append('path', filePath);
    formData.append('collectionName', 'test2');
    formData.append('mongoURL', process.env.MONGO_URL);

    const response = await axios.post('https://xlsxmongoapi.kurizu.repl.co/add', formData, {
      headers: formData.getHeaders(),
    });

    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

addData();
```

Example using RapidAPI:

```javascript
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const path = require('path');
const filePath = path.join('Test.xlsx');

require('dotenv').config();

// Import data from XLSX file to MongoDB
const importFile = async () => {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream('Test.xlsx'));
    formData.append('mongoURL', process.env.MONGO_URL);
    formData.append('collectionName', process.env.MONGO_COLLECTION);

    const response = await axios.post('https://xlsxmongoapi.kurizu.repl.co/import', formData, {
      headers: {
        'content-type': `multipart/form-data; boundary=${formData._boundary}`,
        'x-rapidapi-key': 'YOUR-RAPIDAPI-KEY',
        'x-rapidapi-host': 'xlsx-mongo-api.p.rapidapi.com',
        useQueryString: true,
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

importFile();

// Add data from XLSX file to existing MongoDB collection
const addData = async () => {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream('Test.xlsx'));
    formData.append('path', filePath);
    formData.append('collectionName', 'test2');
    formData.append('mongoURL', process.env.MONGO_URL);

    const response = await axios.post('https://xlsxmongoapi.kurizu.repl.co/add', formData, {
      headers: {
        'content-type': `multipart/form-data; boundary=${formData._boundary}`,
        'x-rapidapi-key': 'YOUR-RAPIDAPI-KEY',
        'x-rapidapi-host': 'xlsx-mongo-api.p.rapidapi.com',
        useQueryString: true,
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

addData();
```

Check https://github.com/crizmo/xlsx-mongo-api/blob/main/tests/test.js for detailed usage examples.

### Installation
1. Clone the repository:
```shell
   git clone https://github.com/crizmo/xlsx-mongo-api.git
```

2. Install dependencies:
```shell
   npm install
```

3. Create a `.env` file in the root directory of the project and add the following environment variables:
```shell
   MONGO_URL=<your-mongodb-connection-url>
   MONGO_COLLECTION=<your-mongodb-collection-name>
```

4. Start the server:
```shell
   npm start
```

# Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug fixes, please open an issue or a pull request.


# License

Distributed under the MIT License. See LICENSE for more information.
Contact

Package Maintainer: crizmo on GitHub
Project Link: https://github.com/crizmo/xlsx-mongo-api