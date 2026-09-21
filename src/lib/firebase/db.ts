import { db } from './config';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  QueryConstraint,
  onSnapshot
} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';

export function subscribeDocument<T = any>(collectionName: string, documentId: string, callback: (data: (T & { id: string }) | null) => void) {
  const docRef = doc(db, collectionName, documentId);
  return onSnapshot(docRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }
    callback({
      id: snapshot.id,
      ...snapshot.data()
    } as T & { id: string });
  }, (error) => {
    console.error('Error in subscribeDocument:', error);
  });
}

export async function getCollection<T>(collectionName: string, ...constraints: QueryConstraint[]): Promise<(T & { id: string })[]> {
  const colRef = collection(db, collectionName);
  const q = query(colRef, ...constraints);
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as (T & { id: string })[];
}

export async function getDocument<T = any>(collectionName: string, documentId: string): Promise<(T & { id: string }) | null> {
  const docRef = doc(db, collectionName, documentId);
  const snapshot = await getDoc(docRef);
  
  if (!snapshot.exists()) return null;
  
  return {
    id: snapshot.id,
    ...snapshot.data()
  } as T & { id: string };
}

export async function createDocument<T extends DocumentData>(collectionName: string, data: T): Promise<string> {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  return docRef.id;
}

export async function updateDocument<T extends DocumentData>(collectionName: string, documentId: string, data: Partial<T>): Promise<void> {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString()
  });
}

export async function setDocument<T extends DocumentData>(collectionName: string, documentId: string, data: T): Promise<void> {
  const docRef = doc(db, collectionName, documentId);
  await setDoc(docRef, {
    ...data,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}

export async function deleteDocument(collectionName: string, documentId: string): Promise<void> {
  const docRef = doc(db, collectionName, documentId);
  await deleteDoc(docRef);
}
