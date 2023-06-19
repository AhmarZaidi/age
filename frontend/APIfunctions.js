// some pre-requisites to run these functions on desktop enviroment
import fetch from "node-fetch";
import { createInterface } from "readline";


const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

// Test data which will come from the frontend
const conn = {
  port: 5455,
  host: "localhost",
  password: "postgresPW",
  user: "postgresUser",
  database: "postgresDB",
  ssl: "disable",
  graph_init: true,
  version: 11,
};

// cookies will be stored here, these are store whenever connect() fun is called 
// and will be used in subsequent calls
let cookies;

function connect() {
  console.log("CONNECT:")
  fetch('http://localhost:8080/connect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(conn),
  })
  .then(response => {
    console.log(response.status);

    // Store the cookies from the response
    console.log("resp headers raw: ", response.headers)
    // console.log("cookie: ", response.headers.raw()['custom-set-cookie'])
    cookies = response.headers.raw()['custom-set-cookie'];
    console.log("cookie: ", cookies)
    console.log("cookie type: ", typeof cookies)
    
    console.log("cookies[0]: ", cookies[0])
    console.log("cookie type: ", typeof (cookies[0]))

    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
}

function status() {
  console.log("STATUS:")
  fetch('http://localhost:8081/status', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies[0],
    },
  })
  .then(response => {
    console.log(response.status);
    return response.json();
  })
  .then(data => {
    // visualize the data in formatted ways
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });
}

function queryMetadata() {
  console.log("METADATA:")
  fetch('http://localhost:8080/query/metadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies.join('; '),
    },
  })
  .then(response => {
    console.log(response.status);
    return response.json();
  })
  .then(data => {
    // visualize the data in formatted ways
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error(error);
  });
}


function query() {
  console.log("QUERY:")
  const payload = {
    query: "SELECT * from cypher('demo', $$ MATCH (V:node) RETURN V $$) as (V agtype);",
  };

  fetch('http://localhost:8081/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies.join('; '),
    },
    body: JSON.stringify(payload),
  })
  .then(response => {
    console.log(response.status);

    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
}

function disconnect() {
  fetch('http://localhost:8081/disconnect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies.join('; '), // Send the cookies from the previous connection
    },
  })
  .then(response => {
    console.log(response.status);
    cookies = []; // Clear the cookies variable
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
}


// dummy function to test the above functions

let choice;
function chooseFunction() {  

rl.question('Enter the function number: [1->connect], [2->status], [3->metadata], [4->query], [5->disconnect] ', (input) => {
    const choice = parseInt(input);
    if (Number.isNaN(choice) || choice < 1 || choice > 4) {
      console.log('Invalid choice. Please try again.');
    } else {
      switch (choice) {
        case 1:
          connect();
          break;
        case 2:
          status();
          break;
        case 3:
          queryMetadata();
          break;
        case 4:
          query();
          break;
        case 5:
          disconnect();
          break;
      }
    }
    // rl.close();
    chooseFunction()
  });

}

chooseFunction();