import Head from "next/head";
import Image from "next/image";
import Styles from "../../styles/BaseBlurred.module.scss";
import Asset1 from "../../public/images/vectors/SoundKafe Web App Design Assets/Asset (1).svg";
import Asset2 from "../../public/images/vectors/SoundKafe Web App Design Assets/Asset (2).svg";
import Asset3 from "../../public/images/vectors/SoundKafe Web App Design Assets/Asset (3).svg";
import Asset4 from "../../public/images/vectors/SoundKafe Web App Design Assets/Asset (4).svg";
import Asset5 from "../../public/images/vectors/SoundKafe Web App Design Assets/Asset (5).svg";
import Asset6 from "../../public/images/vectors/SoundKafe Web App Design Assets/Asset (6).svg";
import Asset7 from "../../public/images/vectors/SoundKafe Web App Design Assets/Asset (7).svg";
import Asset8 from "../../public/images/vectors/SoundKafe Web App Design Assets/Asset (8).svg";
import Asset9 from "../../public/images/vectors/SoundKafe Web App Design Assets/Asset (9).svg";
import Asset10 from "../../public/images/vectors/SoundKafe Web App Design Assets/Asset (10).svg";
import Asset11 from "../../public/images/vectors/SoundKafe Web App Design Assets/Asset (11).svg";

export default function Base() {
  return (
    <>
      <div className={Styles.Base}>
        <div className={Styles.Blob1}></div>
        <div className={Styles.Blob2}></div>
        <div className={Styles.Base_Base}>
          <div className={Styles.Asset1}>
            <Image src={Asset1} layout="fill"/>
          </div>
          <div className={Styles.Asset2}>
            <Image src={Asset2} layout="fill"/>
          </div>
          <div className={Styles.Asset3}>
            <Image src={Asset3} layout="fill"/>
          </div>
          <div className={Styles.Asset4}>
            <Image src={Asset4} layout="fill"/>
          </div>
          <div className={Styles.Asset5}>
            <Image src={Asset5} layout="fill"/>
          </div>
          <div className={Styles.Asset6}>
            <Image src={Asset6} layout="fill"/>
          </div>
          <div className={Styles.Asset7}>
            <Image src={Asset7} layout="fill"/>
          </div>
          <div className={Styles.Asset8}>
            <Image src={Asset8} layout="fill"/>
          </div>
          <div className={Styles.Asset9}>
            <Image src={Asset9} layout="fill"/>
          </div>
          <div className={Styles.Asset10}>
            <Image src={Asset10} layout="fill"/>
          </div>
          <div className={Styles.Asset10Copy}>
            <Image src={Asset10} layout="fill"/>
          </div>
          <div className={Styles.Asset11}>
            <Image src={Asset11} layout="fill"/>
          </div>
        </div>
      </div>
    </>
  );
}
