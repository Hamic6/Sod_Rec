const {onDocumentDeleted} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
admin.initializeApp();

exports.cleanupCandidateFiles = onDocumentDeleted(
    "candidats/{candidatId}",
    async (event) => {
      const data = event.data?.before.data();
      const bucket = admin.storage().bucket();

      const files = [data?.photo, data?.cv, data?.diplome].filter(Boolean);

      for (const url of files) {
        try {
          const match = url.match(/\/o\/(.*?)\?/);
          if (match && match[1]) {
            const filePath = decodeURIComponent(match[1]);
            await bucket.file(filePath).delete();
          }
        } catch (err) {
          console.error("Erreur suppression fichier:", err);
        }
      }
      return null;
    },
);
