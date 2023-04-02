import Image from "next/image";
import Styles from "../../styles/NavBar.module.scss";
import Logo from "../../public/images/vectors/SoundKafe Logo.svg";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className={Styles.NavBar}>
      <div className={Styles.LogoDiv}>
        <Image src={Logo} layout="fill" />
      </div>
      <ul className={Styles.NavUl}>
        <li className={Styles.NavLi}><Link href="/">Home</Link></li>
        <li className={Styles.NavLi}><Link href="/sounds">Access Our Sounds</Link></li>
        <li className={Styles.NavLi}><Link href="/">Contribute</Link></li>
        <li className={Styles.NavLi}><Link href="/">About Us</Link></li>
      </ul>
    </nav>
  );
}
