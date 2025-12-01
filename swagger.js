const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'School Management API',
        description: 'A simple school management API application',
    },
    host: 'cse341-project2-93m5.onrender.com',
    schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);