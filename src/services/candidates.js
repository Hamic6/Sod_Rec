import { db } from './firebase'; // Import the Firebase database instance

// Function to fetch all candidates from the database
export const fetchCandidates = async () => {
  try {
    const snapshot = await db.collection('candidates').get();
    const candidates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return candidates;
  } catch (error) {
    console.error("Error fetching candidates: ", error);
    throw error;
  }
};

// Function to add a new candidate to the database
export const addCandidate = async (candidateData) => {
  try {
    const docRef = await db.collection('candidates').add(candidateData);
    return { id: docRef.id, ...candidateData };
  } catch (error) {
    console.error("Error adding candidate: ", error);
    throw error;
  }
};

// Function to update an existing candidate's information
export const updateCandidate = async (id, updatedData) => {
  try {
    await db.collection('candidates').doc(id).update(updatedData);
    return { id, ...updatedData };
  } catch (error) {
    console.error("Error updating candidate: ", error);
    throw error;
  }
};

// Fonction pour récupérer le statut d'un candidat (exemple simple)
export const getCandidateStatus = async (candidateId) => {
  try {
    const doc = await db.collection('candidates').doc(candidateId).get();
    if (doc.exists) {
      return doc.data().status || "Inconnu";
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du statut du candidat :", error);
    throw error;
  }
};