const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Students and Teachers API',
        description: 'A simple API to manage students and teachers in a MongoDB database',
    },
    host: 'cse341-project2-93m5.onrender.com',
    schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);