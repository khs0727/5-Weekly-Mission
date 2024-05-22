import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import noImage from "../../images/noimage.svg";
import starbutton from "../../images/star.svg";
import kebab from "../../images/kebab.svg";
import { generateTimeText, formatDate } from "../../utils/Function";
import Popover from "@components/Popover";
import styles from "./Card.module.css";

interface CardProps {
  link: {
    id: number;
    created_at: string;
    updated_at: string | null;
    url: string;
    title: string;
    description: string;
    image_source: string;
    folder_id: number | null;
  };
  isFolderPage: boolean;
}

const Card = ({ link, isFolderPage }: CardProps) => {
  const { url, title, description } = link;
  const createdAt = link.created_at || "";
  const imageSource = link.image_source;

  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleTogglePopover = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  return (
    <div className={styles.card_container}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Image
          className={styles.card_image}
          src={imageSource || noImage}
          alt={title || "No Image"}
          width={340}
          height={200}
        />
      </a>
      <Image className={styles.starbutton} src={starbutton} alt="즐겨찾기" />
      <div className={styles.card_text}>
        <p className={styles.card_time}>{generateTimeText(createdAt)}</p>
        {isFolderPage && (
          <Image
            className={styles.kebabbutton}
            src={kebab}
            alt="더보기"
            onClick={handleTogglePopover}
          />
        )}

        {isPopoverOpen && (
          <div className={styles.popover_content}>
            <Popover />
          </div>
        )}

        <div className={styles.card_description}>
          <p>{description}</p>
        </div>
        <div className={styles.card_date}>
          <p>{formatDate(createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
