import { useRouter } from "next/router";
import { db, storage } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import Styles from "../../styles/Tracks.module.scss";
import Base from "../../pages/components/BaseBlurred";
import NavBar from "../../pages/components/NavBar";

export default function TrackID() {
  const Router = useRouter();
  TrackID = Router.query.TrackID;
  const [trackDetails, setTrackDetails] = useState({});
  const [url, setUrl] = useState({});
  var TrackID;
  var FetchChecker = true;

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "soundTracks", TrackID);
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
    })();
  }, [TrackID]);

  console.log(FetchChecker);
  const { trackName, creatorName, storageUrl } = trackDetails;
  console.log(storageUrl);
  GetDownloadUrl();

  async function GetDownloadUrl() {
    const reference = ref(storage, storageUrl);
    await getDownloadURL(reference).then((URL) => {
      setUrl(URL);
      const audioPlayer = document.getElementById("audioPlayer");
      audioPlayer.setAttribute("src", url);
    });
  }
  console.log(url);

  return (
    <>
      <NavBar />
      <div className={Styles.BaseContainer}>
        <Base />
      </div>

      <div className={Styles.Container}>
        <h2 className={Styles.TrackName}>{trackName}</h2>

        <audio controls id="audioPlayer" className={Styles.Player}>
          <source type="audio/mp3" />
        </audio>

        <h2 className={Styles.TrackDetails}>
          This Sound Track was composed by {creatorName}.<br></br>
          Recorded by Brauner VM1S.<br></br>
          Available in 48000 Hz, suitable for all sorts of Audio-Processing.
          <br></br>
          Hoping that You will love our content, we look forward to a favourable
          response.<br></br>
          Thank You!
        </h2>
      </div>
    </>
  );
}
