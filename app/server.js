const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const app = express();

const { MongoClient } = require('mongodb');
const uri = process.env.API_KEY;

app.use(cors());

app.get('/api/bookings/:code', (req, res) => {
  const { code } = req.params;

  async function getBooking() {
    const client = new MongoClient(uri);

    try {
      await client.connect();
      await getByCode(client);
    } finally {
      await client.close();
    }
  }

  async function getByCode(client) {
    const result = await client
      .db('asimov')
      .collection('bookings')
      .findOne({ changeCode: code });
    console.log(result);

    if (result) {
      res.json(result);
      res.status(200).end();
    } else {
      res.statusMessage = 'not found';
      res.status(409).end();
    }
  }

  getBooking();
});

app.get('/api/unbook/:code', (req, res) => {
  async function deleteBooking(data) {
    const client = new MongoClient(uri);

    try {
      await client.connect();
      await deleteByCode(client, data);
    } finally {
      await client.close();
    }
  }

  async function deleteByCode(client, changeCode) {
    const result = await client
      .db('asimov')
      .collection('bookings')
      .deleteOne({ changeCode });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
  }

  const { code } = req.params;

  deleteBooking(code);

  res.statusMessage = 'deleted';
  res.status(200).end();
});

app.get('/api/bookings', (req, res) => {
  async function getAll() {
    const client = new MongoClient(uri);

    try {
      await client.connect();
      await getBookings(client);
    } finally {
      await client.close();
    }
  }

  async function getBookings(client) {
    const cursor = await client.db('asimov').collection('bookings').find({});
    const results = await cursor.toArray();
    console.log(results);

    res.json(
      results.map((item) => {
        const obj = { date: item.date, time: item.time };
        return obj;
      })
    );
  }

  getAll();
});

app.post('/api/book', express.json({ type: '*/*' }), (req, res) => {
  async function update(data) {
    const client = new MongoClient(uri);

    try {
      await client.connect();
      await updateByCode(client, req.body.changeCode, {
        date: req.body.date,
        time: req.body.time,
      });
    } finally {
      await client.close();
    }
  }

  async function updateByCode(client, changeCode, updatedListing) {
    const result = await client
      .db('asimov')
      .collection('bookings')
      .updateOne({ changeCode: changeCode }, { $set: updatedListing });

    if (result.modifiedCount === 0) {
      async function getBooking() {
        const client = new MongoClient(uri);

        try {
          await client.connect();
          await getByEmail(client);
        } finally {
          await client.close();
        }
      }

      async function getByEmail(client) {
        const result = await client
          .db('asimov')
          .collection('bookings')
          .findOne({ clientEmail: req.body.clientEmail });
        console.log(result);

        if (result) {
          res.statusMessage = 'not added';
          res.status(409).end();
        } else {
          async function add(data) {
            const client = new MongoClient(uri);

            try {
              await client.connect();
              await createBooking(client, data);
            } finally {
              await client.close();
            }
          }

          async function createBooking(client, newBooking) {
            const result = await client
              .db('asimov')
              .collection('bookings')
              .insertOne(newBooking);
            console.log(
              `New booking created with the following id: ${result.insertedId}`
            );
          }

          add(req.body);

          res.statusMessage = 'added';
          res.status(200).end();
        }
      }
      getBooking();
    } else {
      res.statusMessage = 'updated';
      res.status(200).end();
    }
  }
  update();
});

app.listen(3100, () => {
  console.log('server is on 3100');
});

app.all('*', (req, res) => {
  res.status(404).send('not found');
});
