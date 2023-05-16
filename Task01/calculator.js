const express = require('express');
const soap = require('soap');

// Create an Express app
const app = express();

// Define the SOAP service
const service = {
  CalculatorService: {
    CalculatorPort: {
      add: function (args) {
        const { num1, num2 } = args;
        const result = parseInt(num1) + parseInt(num2);
        return { result: result };
      },
      subtract: function (args) {
        const { num1, num2 } = args;
        const result = parseInt(num1) - parseInt(num2);
        return { result: result };
      },
      multiply: function (args) {
        const { num1, num2 } = args;
        const result = parseInt(num1) * parseInt(num2);
        return { result: result };
      },
      divide: function (args) {
        const { num1, num2 } = args;
        if (parseInt(num2) === 0) {
          throw {
            Fault: {
              Code: {
                Value: 'SOAP-ENV:Client',
                Subcode: { value: 'a:DivideByZero' }
              },
              Reason: { Text: 'Cannot divide by zero' },
              statusCode: 500
            }
          };
        }
        const result = parseInt(num1) / parseInt(num2);
        return { result: result };
      }
    }
  }
};

const xml = require('fs').readFileSync('calculator.wsdl', 'utf8');
const server = soap.listen(app, '/calculator', service, xml);

const port = 3000;
app.listen(port, function () {
  console.log('Calculator SOAP web service running on port ' + port);
});


