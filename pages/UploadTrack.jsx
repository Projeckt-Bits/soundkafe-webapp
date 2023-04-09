//Importing Required Modules To Connect To DataBase.
import { db, storage } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import Styles from "../styles/UploadTrack.module.scss";

export default function Home() {
  //Variables
  var folderPath = "";
  var storageUrl = "";
  var creatorName = "";
  var trackName = "";
  var trackId = "";
  var collectionName = "";
  var tags = "";
  var dummy_mp3downloadlink = "";
  var dummy_wavdownloadlink = "";
  var pullCounterValue = 0;
  var pushCounterValue = 0;
  var playlistName = "";
  var tagsPath = "";

  async function UploadTrack() {
    creatorName = document.getElementById("creatorName").value;
    trackName = document.getElementById("trackName").value;
    collectionName = document.getElementById("collectionName").value;
    folderPath = document.getElementById("folderPath").value;
    tags = document.getElementById("tags").value;
    dummy_mp3downloadlink = document.getElementById("mp3downloadlink").value;
    dummy_wavdownloadlink = document.getElementById("wavdownloadlink").value;
    playlistName = document.getElementById("playlistName").value;

    const mp3downloadlinkarray = dummy_mp3downloadlink.split("/");
    console.log(mp3downloadlinkarray);
    const mp3downloadlink =
      "https://drive.google.com/u/0/uc?id=" +
      mp3downloadlinkarray[5] +
      "&export=download";

    const wavdownloadlinkarray = dummy_wavdownloadlink.split("/");
    console.log(mp3downloadlinkarray);
    const wavdownloadlink =
      "https://drive.google.com/u/0/uc?id=" +
      wavdownloadlinkarray[5] +
      "&export=download";

    storageUrl = folderPath + trackName + ".mp3";

    const sfxCounter = doc(db, "counters", playlistName);
    const sfxCounterSnap = await getDoc(sfxCounter);
    pullCounterValue = sfxCounterSnap.data().pullCounterValue;
    pushCounterValue = pullCounterValue + 1;
    trackId = pushCounterValue.toString();

    if (playlistName == "soundEffects") {
      tagsPath = "soundEffectsTags";
    }
    if (playlistName == "soundTracks") {
      tagsPath = "soundTracksTags";
    }

    await setDoc(doc(db, playlistName, trackId), {
      creatorName: creatorName,
      trackName: trackName,
      storageUrl: storageUrl,
      mp3downloadlink: mp3downloadlink,
      wavdownloadlink: wavdownloadlink,
      collectionName: collectionName,
    });

    await setDoc(doc(db, "counters", playlistName), {
      pullCounterValue: pushCounterValue,
    });

    const tagsArray = tags.split(", ");
    const tagsArrayLen = tagsArray.length;
    var tagsArrayIndex = 0;
    for (
      tagsArrayIndex = 0;
      tagsArrayIndex <= tagsArrayLen - 1;
      tagsArrayIndex++
    ) {
      var docName = tagsArray[tagsArrayIndex];
      docName = docName.toLowerCase();
      var tagDocRef = doc(db, tagsPath, docName);
      var tagDocSnap = await getDoc(tagDocRef);
      if (tagDocSnap.exists()) {
        await updateDoc(doc(db, tagsPath, docName), {
          value: arrayUnion(trackId),
        });
      } else {
        await setDoc(doc(db, tagsPath, docName), {
          value: arrayUnion(trackId),
        });
      }
    }

    const sfxCounterSnapChk = await getDoc(sfxCounter);
    var pullCounterValueCheck = sfxCounterSnapChk.data().pullCounterValue;
    if (pullCounterValueCheck == pushCounterValue) {
      alert("Successfully Uploaded");
      //ClearInputFields();
    } else {
      alert("Upload Interrupted");
    }
  }

  return (
    <>
      <div className={Styles.BaseDiv}>
        <h3 className={Styles.Title}>Creator Name</h3>
        <input
          className={Styles.StringInput}
          type="text"
          id="creatorName"
          placeholder="Please Enter Creator Name Here!"
          required
        />
        <h3 className={Styles.Title}>Track Name</h3>
        <input
          className={Styles.StringInput}
          type="text"
          id="trackName"
          placeholder="Please Enter Track Name Here!"
          required
        />
        <h3 className={Styles.Title}>
          Collection Name [Also Include Sub-Collections(If Any)]
        </h3>
        <input
          className={Styles.StringInput}
          type="text"
          id="collectionName"
          placeholder="Please Enter Collection Name Here!"
          required
        />
        <h3 className={Styles.Title}>
          Playlist Name [soundEffects/soundTracks]
        </h3>
        <input
          className={Styles.StringInput}
          type="text"
          id="playlistName"
          placeholder="Please Enter Collection Name Here!"
          required
        />
        <h3 className={Styles.Title}>Folder Path</h3>
        <input
          className={Styles.StringInput}
          type="text"
          id="folderPath"
          placeholder="Please Enter Folder Path Here! Include Forward Slashes!"
          required
        />
        <h3 className={Styles.Title}>Tags In CSV Format</h3>
        <input
          className={Styles.StringInput}
          type="text"
          id="tags"
          placeholder="Please Enter Comma Separated Tags Here!"
        />
        <h3 className={Styles.Title}>.mp3 Download Link</h3>
        <input
          className={Styles.StringInput}
          type="text"
          id="mp3downloadlink"
          placeholder="Please Enter Download Here!"
        />
        <h3 className={Styles.Title}>.wav Download Link</h3>
        <input
          className={Styles.StringInput}
          type="text"
          id="wavdownloadlink"
          placeholder="Please Enter Download Here!"
        />
        <br></br>
        <button className={Styles.Button} onClick={UploadTrack}>
          Upload Track
        </button>
        <br></br>
      </div>
    </>
  );
}
