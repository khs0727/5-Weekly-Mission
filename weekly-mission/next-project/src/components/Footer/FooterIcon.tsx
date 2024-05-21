import React from "react";
import Link from "next/link";
import {
  BiLogoFacebookCircle,
  BiLogoTwitter,
  BiLogoYoutube,
  BiLogoInstagramAlt,
} from "react-icons/bi";
import styles from "./FooterIcon.module.css";

const SOCIAL_SHARES = [
  {
    url: "https://www.facebook.com/?locale=ko_KR",
    icon: <BiLogoFacebookCircle />,
  },
  {
    url: "https://twitter.com/?lang=ko",
    icon: <BiLogoTwitter />,
  },
  {
    url: "https://www.youtube.com/?gl=KR&hl=ko",
    icon: <BiLogoYoutube />,
  },
  {
    url: "https://www.instagram.com/",
    icon: <BiLogoInstagramAlt />,
  },
];

const FooterIcons = () => {
  return (
    <div className={styles.footericons}>
      {SOCIAL_SHARES.map((share, index) => (
        <Link key={share.url} href={share.url} target="_blank">
          {share.icon}
        </Link>
      ))}
    </div>
  );
};

export default FooterIcons;
