import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/confing";


export const loadNotes = async ( uid = '' ) => {
    if( !uid ) throw new error('El uid del usuario no existe');

    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
    const docs = await getDocs( collectionRef );

    const notes = [];
    docs.forEach( doc => {
        notes.push( { id: doc.id, ...doc.data() });
    });

    return notes;
}