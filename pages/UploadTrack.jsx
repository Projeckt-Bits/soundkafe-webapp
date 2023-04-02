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
  var url = "";
  var tags = "";
  var pullCounterValue = 0;
  var pushCounterValue = 0;

  //Function To Clear All Input Fields
  function ClearInputFields() {
    var getValue1 = document.getElementById("creatorName");
    if (getValue1.value != "") {
      getValue1.value = "";
    }
    var getValue2 = document.getElementById("trackName");
    if (getValue3.value != "") {
      getValue3.value = "";
    }
    var getValue3 = document.getElementById("collectionName");
    if (getValue3.value != "") {
      getValue3.value = "";
    }
    var getValue4 = document.getElementById("url");
    if (getValue4.value != "") {
      getValue4.value = "";
    }
    var getValue5 = document.getElementById("tags");
    if (getValue5.value != "") {
      getValue5.value = "";
    }
  }

  async function UploadTrack() {
    const sfxCounter = doc(db, "counters", "sfxCounter");

    creatorName = document.getElementById("creatorName").value;
    trackName = document.getElementById("trackName").value;
    collectionName = document.getElementById("collectionName").value;
    folderPath = document.getElementById("folderPath").value;
    tags = document.getElementById("tags").value;

    storageUrl = folderPath + trackName + ".mp3";

    const sfxCounterSnap = await getDoc(sfxCounter);
    pullCounterValue = sfxCounterSnap.data().pullCounterValue;
    pushCounterValue = pullCounterValue + 1;
    trackId = pushCounterValue.toString();

    await setDoc(doc(db, "soundTracks", trackId), {
      creatorName: creatorName,
      trackName: trackName,
      storageUrl: storageUrl,
      collectionName: collectionName,
    });

    await setDoc(doc(db, "counters", "sfxCounter"), {
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
      var tagDocRef = doc(db, "searchTags", docName);
      var tagDocSnap = await getDoc(tagDocRef);
      if (tagDocSnap.exists()) {
        await updateDoc(doc(db, "searchTags", docName), {
          value: arrayUnion(trackId),
        });
      } else {
        await setDoc(doc(db, "searchTags", docName), {
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

  const [trackUpload, setTrackUpload] = useState(null);
  async function UploadTrackFile() {
    const tracksListRef = ref(storage, "tracks/");
    if (trackUpload == null) return;
    const trackRef = ref(storage, `tracks/${trackUpload.name()}`);
    uploadBytes(trackRef, trackUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        var getValue4 = document.getElementById("url");
        getValue4.value = url;
      });
    });
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
        <h3 className={Styles.Title}>Collection Name [Also Include Sub-Collections(If Any)]</h3>
        <input
          className={Styles.StringInput}
          type="text"
          id="collectionName"
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
        
        {/*<div className={Styles.TrackFileUpload}>
          <h3 className={Styles.Title}>Upload Track File</h3>
          //actual upload which is hidden
          <input
            className={Styles.ActualUploadBtn}
            type="file"
            id="Actual-Upload-Button"
            hidden
            onChange={(event) => {
              setTrackUpload(event.target.files[0]);
            }}
          />

          custom upload button
          <label className={Styles.LabelButton} for="Actual-Upload-Button">
            Choose File
          </label>

          name of file chosen
          <h2 className={Styles.Title} id="file-chosen">
            No File Chosen!
          </h2>
          <button className={Styles.Button} onClick={UploadTrackFile}>
            Upload Track File
          </button>
          </div>
        <h3 className={Styles.Title}>Url</h3>
        <input
          className={Styles.StringInput}
          type="text"
          id="url"
          placeholder="Retrieving Track Url..."
          required
        />**/}
        <h3 className={Styles.Title}>Tags In CSV Format</h3>
        <input
          className={Styles.StringInput}
          type="text"
          id="tags"
          placeholder="Please Enter Comma Separated tags Here!"
        />
        <br></br>
        <button className={Styles.Button} onClick={UploadTrack}>
          Upload Track
        </button>
      </div>
    </>
  );
}
