import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { app, db } from './firebase';
import type { DiaryProps } from './types';

export const addDiary = async (data: DiaryProps) => {
    try {
        console.log("Adding document...", data);
        const collectionRef = collection(db, "diary");
        const docRef = await addDoc(collectionRef, data);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    return null;
}

export const getDiaries = async (email: string) => {
    const entries:DiaryProps[] | null = [];
    console.log("Getting documents...", email);
    
    const diaryRef = collection(db, "diary");
    const q = query(diaryRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        entries.push({ ...doc.data(), id: doc.id } as DiaryProps);
    });

    return entries
}

export const deleteDiary = async (id: string) => {
    const docRef = doc(db, "diary", id);
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", id);
}