import Styles from "../../styles/Tracks.module.scss";
import Base from "../../pages/components/BaseBlurred";
import NavBar from "../../pages/components/NavBar";

export default function Sounds() {
  return (
    <>
      <NavBar />
      <div className={Styles.BaseContainer}>
        <Base />
      </div>
    </>
  );
}
