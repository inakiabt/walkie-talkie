# Walkie-Talkie

An interface for speaking to intercom.io API. There complete docs can be found here - http://doc.intercom.io/api/


## Installation

To start playing with the library in your project, run

    npm install walkie-talkie --save


## API Overview

To implement Walkie-Talkie, this is the basic method to get data for a user by email

    var settings = {
      "api_key": "your_API_key",
      "app_id": "your_APP_ID"
    }

    var intercom = require('walkie-talkie').app(settings);

    intercom.users.get('test@example.com', function(code, body) {
        // code is the request status code from the API
        // body is the response body as a JSON object
        console.log(code);
        console.log(body);
    });

See the tests folder for more examples.

## Contributing and Testing

Contributing bug fixes and features is very welcome! If you want to contribute to the project, you'll need to run create and run tests for anything that needs it.
and Mocha is used for testing so add your tests to the `test` folder, but first you'll need to create a `config.json` file in the root of the tests folder and fill it with your credentials.

Run

    npm install && npm install -g mocha gulp

then create your `config.json` in the `test` folder

    {
      "settings": {
        "app_id": "APP_ID_HERE",
        "api_key": "API_KEY_HERE"
      }
    }

then you can run the tests

    gulp test


## Missing or TODO

- Impressions API


## License

Copyright 2012 Chloi Inc.
All rights reserved.

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
