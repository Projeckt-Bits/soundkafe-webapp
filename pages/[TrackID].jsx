import { useRouter } from "next/router";
import { db, storage } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function TrackID() {
  const Router = useRouter();
  var trackName2 = "";
  var TrackID;
  var FetchChecker = true;
  let trackName = "";
  TrackID = Router.query.TrackID;

  async function GetInfo() {
    const docRef = doc(db, "soundEffects", TrackID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        FetchChecker = true;    
     trackName = (docSnap.data().trackName).toString();
     console.log(trackName, FetchChecker)

    document.getElementById('Hlo').innerHTML = trackName;
     return trackName;
    } else {
        FetchChecker = false;
     console.log("No such document!");
    }

    
}

{/**console.log(trackName);

let a = GetInfo();
a.then((value) => {
    trackName2 = value;
},);

console.log("Track Name 2");
console.log(trackName2)**/}
  return (
    <>
      <h2 id="Hlo">Hi! This is a Sound Track With Track Name {trackName}</h2>
    </>
  );
}
