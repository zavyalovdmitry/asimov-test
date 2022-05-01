const express = require('express');
const { readFile, writeFile } = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// let bookings = [];

const fileName = './data.json';

const getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

// getFile(fileName)
//   .then((data) => {
//     bookings = data;
//     console.log(bookings);
//   })
//   .catch((err) => console.error(err));

// const readData = () => {
//   getFile(fileName)
//     .then((data) => {
//       bookings = data;
//       console.log(bookings);
//     })
//     .catch((err) => console.error(err));
// readFile('./data.json', 'utf8', (err, jsonString) => {
//   if (err) {
//     console.log('File read failed:', err);
//     return;
//   }
//   // console.log('File data:', jsonString);
//   // const dat = (jsonString) => jsonString;
//   // return dat(jsonString);
//   jsonString.then((data) => (bookings = data));
// });
// let data = [];
// try {
//   const data = await readFile('./data.json', 'utf8', (err, result) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(9, JSON.parse(result));
//     // return JSON.parse(result);
//     bookings = JSON.parse(result);
//   });
//   // console.log(data);
//   // return data;
// } catch (error) {
//   console.log(error);
// }
// console.log('9', data);
// return data;
// };

app.get('/api/bookings', (req, res) => {
  getFile(fileName)
    .then((data) => {
      const bookings = JSON.parse(data);
      // console.log(typeof data);
      res.json(
        bookings.map((item) => {
          const obj = { id: item.id, date: item.date, time: item.time };
          return obj;
        })
      );
    })
    .catch((err) => console.error(err));
  // console.log(bookings);
});

app.post('/api/book', express.json({ type: '*/*' }), (req, res) => {
  // const bookings = readData();
  // res.json(
  //   bookings.map((item) => {
  //     const obj = { id: item.id, date: item.date, time: item.time };
  //     return obj;
  //   })
  // );
  getFile(fileName).then((data) => {
    const bookings = JSON.parse(data);
    // console.log(bookings);
    const arr = [...bookings];
    // console.log(arr);
    arr.push(req.body);
    // console.log(arr);

    writeFile('./data.json', JSON.stringify(arr), 'utf8', (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });
});

app.listen(3100, () => {
  console.log('server is on 3100');
});

// const express = require('express');
// const path = require('path');

// const app = express();

// app.get('/', (req, res) => {
//   res.status(200).send('home page');
// });

// app.get('/about', (req, res) => {
//   res.status(200).send('about page');
// });

// app.all('*', (req, res) => {
//   res.status(404).send('<h1>not found</h1>');
// });

// app.use(express.static('./public'));

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
// });

app.all('*', (req, res) => {
  res.status(404).send('not found');
});

// app.listen(5100, () => {
//   console.log('server is on 5100');
// });
