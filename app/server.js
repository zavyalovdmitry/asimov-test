const express = require('express');
const { readFile, writeFile } = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = './data.json';

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

const putFile = (arr) => {
  writeFile('./data.json', JSON.stringify(arr), 'utf8', (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

app.get('/api/bookings/:code', (req, res) => {
  const { code } = req.params;
  getFile(DATA_FILE)
    .then((data) => {
      const bookings = JSON.parse(data);
      const result = bookings.find((item) => item.changeCode === code);
      // console.log(result);
      if (result) {
        res.json(result);
      } else {
        res.statusMessage = 'not found';
        res.status(409).end();
      }
    })
    .catch((err) => console.error(err));
});

app.get('/api/unbook/:code', (req, res) => {
  const { code } = req.params;
  getFile(DATA_FILE)
    .then((data) => {
      const bookings = JSON.parse(data);
      const result = bookings.filter((item) => item.changeCode !== code);
      // console.log(result);
      // if (result) {
      //   res.json(result);
      // } else {
      console.log(result);
      putFile(result);
      res.statusMessage = 'deleted';
      res.status(200).end();
      // }
    })
    .catch((err) => console.error(err));
});

app.get('/api/bookings', (req, res) => {
  getFile(DATA_FILE)
    .then((data) => {
      const bookings = JSON.parse(data);
      res.json(
        bookings.map((item) => {
          const obj = { id: item.id, date: item.date, time: item.time };
          return obj;
        })
      );
    })
    .catch((err) => console.error(err));
});

app.post('/api/book', express.json({ type: '*/*' }), (req, res) => {
  getFile(DATA_FILE).then((data) => {
    const bookings = JSON.parse(data);

    if (bookings.find((item) => item.clientEmail === req.body.clientEmail)) {
      // console.log('nope');
      // res.end('nope');
      res.statusMessage =
        'You already have a scheduled appointment, more would be too much.';
      res.status(409).end();

      return;
    }
    const arr = [...bookings];

    arr.push(req.body);
    console.log(arr);
    putFile(arr);

    res.statusMessage = `Your appointment was scheduled to ${
      req.body.date
    } at ${req.body.time.slice(
      0,
      5
    )}. You will have just one hour so be prepared! Use this code ${
      req.body.changeCode
    } to make any changes to your reservation, but better don't.`;
    res.status(200).end();
  });
});

app.listen(3100, () => {
  console.log('server is on 3100');
});

app.all('*', (req, res) => {
  res.status(404).send('not found');
});
