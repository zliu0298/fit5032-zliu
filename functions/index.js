/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
// functions/index.js
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snap = await admin.firestore().collection("books").get();
      res.status(200).send({count: snap.size});
    } catch (err) {
      console.error("Error counting books:", err);
      res.status(500).send({error: "Error counting books"});
    }
  });
});

exports.addBookUppercase = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') return res.status(405).send('Use POST');

      const body = req.body || {};
      const isbn = body.isbn ?? null;
      const name = body.name ?? null;

      const title  = body.title  ?? name ?? '';
      const author = body.author ?? '';
      const notes  = body.notes  ?? '';

      const doc = isbn !== null && name !== null
        ? { isbn, name: String(name).toUpperCase(), createdAt: new Date().toISOString() }
        : {
            title:  String(title).toUpperCase(),
            author: String(author).toUpperCase(),
            notes:  String(notes).toUpperCase(),
            createdAt: new Date().toISOString(),
          };

      const ref = await admin.firestore().collection('books').add(doc);
      res.status(201).send({ id: ref.id });
    } catch (e) {
      res.status(500).send({ error: 'add failed' });
    }
  });
});


// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
