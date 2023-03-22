import { useRouter } from "next/router";
import { db, storage } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";

export default function TrackID() {
  const Router = useRouter();
  TrackID = Router.query.TrackID;
  const [trackDetails, setTrackDetails] = useState({});
  const [url, setUrl] = useState({});
  var TrackID;
  var FetchChecker = true;

  useEffect(() => {
  ;(async () => {
    const docRef = doc(db, "soundEffects", TrackID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      FetchChecker = true;
      const data = docSnap.data();
      setTrackDetails(data);
      return FetchChecker;
    } else {
      FetchChecker = false;
      console.log("No such document!");
      return FetchChecker;
    }
  })()
}, [TrackID])

  console.log(FetchChecker);
  const { trackName, creatorName, storageUrl } = trackDetails;
 console.log( storageUrl);
 GetDownloadUrl();

  async function GetDownloadUrl() {
    const reference = ref(
      storage,
      storageUrl
    );
    await getDownloadURL(reference).then((URL) => {
      setUrl(URL);
      const audioPlayer = document.getElementById("audioPlayer");
      audioPlayer.setAttribute("src", url);
    });
  }
  console.log(url);

  return (
    <>
      <h2 id="Hlo">
        Hi! This is a Sound Track With Track Name {trackName} {creatorName}
      </h2>
      <audio controls id="audioPlayer">
        <source
          type="audio/mp3"
        />
      </audio>
    </>
  );
}
