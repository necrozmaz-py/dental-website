const sqlite3 = require('sqlite3').verbose();
const axios   = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());


// Database new connection
const db = new sqlite3.Database('./dentalhaven.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('CONNECTED TO DATABASE');
  }
});


//Create table
// sql = `CREATE TABLE bookings(name, age, phone, service, date, time, comments) VALUES (?, ?, ?, ?, ?, ?, ?);`
//   db.run(sql);



// Get data
async function getData(url) {
  try {
    const { data } = await axios.get(url);
    for (const d of data) {
      let bookings = {
        name:d.name ,
        age:d.age,
        phone:d.phone,
        service:d.service,
        date:d.date,
        time: d.time,
        comments: d.comments,

      };
      sql = `INSERT INTO bookings(name, age, phone, service, date, time, comments)VALUES (?, ?, ?, ?, ?, ?, ?)`;
      db.run(sql, [bookings.name, bookings.age, bookings.phone, bookings.service, bookings.date, bookings.time, bookings.comments], (err) => {
          if (err) console.error(err);
           else console.log("Succsess!");
      
      });
      
    };
  }catch (error) {
    console.log(error);
  }
    }
    getData("https://random-data-api.com/api/users/random_user?search=20");


    // if (Array.isArray(data)) {
    //   for (const d of data) {
//         let bookings = {
//           name: d.name,
//           age: d.age,
//           phone: d.phone,
//           service: d.service,
//           date: d.date,
//           time: d.time,
//           comments: d.comments,
//         };

//         
//         await new Promise((resolve, reject) => {
          // 
          //   if (err) {
          //     console.error(err);
          //     reject(err);
          //   } else {
             
              
//             }
//           });
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }




//Query the database


// sql = `SELECT * FROM bookings`;
// db.all(sql,[],(err,rows)=>{
//    if(err) return console.error(err);
//    rows.forEach((row)=>{
//     console.log(row);
//    }  
//     )
// });