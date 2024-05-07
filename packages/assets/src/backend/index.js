const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Database
const admin = require('firebase-admin');
const serviceAccount = require('../../../functions/serviceAccount.development.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
// End Database

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/settings', async (req, res) => {
  try {
    const settingsRef = db.collection('settings');
    const snapShot = await settingsRef.get();
    const data = snapShot.docs.map(doc => doc.data());
    res.json(data);
  } catch (e) {
    console.error(e);
  }
});

const PORT = process.env.PORT || 2908;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
