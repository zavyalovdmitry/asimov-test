const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = express();

const { MongoClient } = require('mongodb');
const uri = process.env.API_KEY;
const PORT = process.env.PORT || 8081;

app.use(cors());

async function getBookings(client) {
  const cursor = await client.db('asimov').collection('bookings').find({});
  const results = await cursor.toArray();
  console.log(results.length, ' bookings found');
  return results;
}

async function getByCode(client, code) {
  const result = await client
    .db('asimov')
    .collection('bookings')
    .findOne({ changeCode: code });
  console.log(result);
  return result;
}

async function deleteByCode(client, code) {
  const result = await client
    .db('asimov')
    .collection('bookings')
    .deleteOne({ changeCode: code });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function updateByCode(client, changeCode, updatedListing) {
  const result = await client
    .db('asimov')
    .collection('bookings')
    .updateOne({ changeCode: changeCode }, { $set: updatedListing });
  return result;
}

async function getByEmail(client, clientEmail) {
  const result = await client
    .db('asimov')
    .collection('bookings')
    .findOne({ clientEmail: clientEmail });
  return result;
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
app.get('/api/bookings/:code', async (req, res) => {
  const { code } = req.params;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const result = await getByCode(client, code);

    if (result) {
      res.json(result);
      res.status(200).end();
    } else {
      res.statusMessage = 'not found';
      res.status(409).end();
    }
  } finally {
    await client.close();
  }
});

app.get('/api/unbook/:code', async (req, res) => {
  const { code } = req.params;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await deleteByCode(client, code);

    res.statusMessage = 'deleted';
    res.status(200).end();
  } finally {
    await client.close();
  }
});

app.get('/api/bookings', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const results = await getBookings(client);

    res.json(
      results.map((item) => {
        const obj = { date: item.date, time: item.time };
        return obj;
      })
    );
  } finally {
    await client.close();
  }
});

app.post('/api/book', express.json({ type: '*/*' }), async (req, res) => {
  const client = new MongoClient(uri);
  const { changeCode, date, time, clientEmail } = req.body;

  try {
    await client.connect();
    const result = await updateByCode(client, changeCode, {
      date: date,
      time: time,
    });

    if (result.modifiedCount === 0) {
      const client = new MongoClient(uri);

      try {
        await client.connect();
        const result = await getByEmail(client, clientEmail);

        if (result) {
          res.statusMessage = 'not added';
          res.status(409).end();
        } else {
          const client = new MongoClient(uri);

          try {
            await client.connect();
            await createBooking(client, req.body);
          } finally {
            await client.close();
          }

          res.statusMessage = 'added';
          res.status(200).end();
        }
      } finally {
        await client.close();
      }
    } else {
      res.statusMessage = 'updated';
      res.status(200).end();
    }
  } finally {
    await client.close();
  }
});

app.all('*', (req, res) => {
  res.status(404).send('not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
