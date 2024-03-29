import useFetchData from "../Hooks/useFetchData";
import noImage from "../../image/noimage.svg";
import styled from "styled-components";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-top: 20px;
  padding: 0 32px;

  @media (max-width: 1199px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 1124px;
    padding: 0 20px;
  }

  @media (max-width: 769px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Card = styled.div`
  width: 340px;
  height: 334px;
  border-radius: 15px;
  box-shadow: 0px 5px 25px 0px #00000014;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.3);
    position: relative;
    z-index: 1;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  object-fit: cover;
`;

const CardText = styled.div`
  width: 100%;
  padding: 15px 20px;
  gap: 10px;
  border-radius: 0px 0px 15px 15px;
  display: flex;
  flex-direction: column;
`;

const CardTime = styled.p`
  font-size: 13px;
  line-height: 15.51px;
  color: #666666;
  font-weight: 400;
  text-align: left;
`;

const CardDescription = styled.div`
  width: 300px;
  height: 48px;
  overflow: hidden;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #333333;
  text-align: left;
`;

const CardDate = styled.div`
  font-size: 14px;
  line-height: 16.71px;
  color: #333333;
  font-weight: 400;
  text-align: left;
`;

const generateTimeText = (createdAt) => {
  const timeDiff = Math.floor((Date.now() - new Date(createdAt)) / (1000 * 60));

  if (timeDiff < 2) {
    return "1 minute ago";
  }
  if (timeDiff <= 59) {
    return `${timeDiff} minutes ago`;
  }
  if (timeDiff < 60 * 24) {
    const hours = Math.floor(timeDiff / 60);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }
  if (timeDiff <= 60 * 24 * 30) {
    const days = Math.floor(timeDiff / (60 * 24));
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
  if (timeDiff <= 60 * 24 * 30 * 31) {
    const months = Math.floor(timeDiff / (60 * 24 * 30));
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  if (timeDiff < 60 * 24 * 30 * 12) {
    const years = Math.floor(timeDiff / (60 * 24 * 30 * 12));
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }

  const years = Math.floor(timeDiff / (60 * 24 * 30 * 12));
  const months = Math.floor(years * 12);
  return `${months} months ago`;
};

const formatDate = (createdAtString) => {
  const createdAt = new Date(createdAtString);
  const year = createdAt.getFullYear();
  const month = String(createdAt.getMonth() + 1).padStart(2, "0");
  const day = String(createdAt.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const Cards = () => {
  const folderData = useFetchData(
    "https://bootcamp-api.codeit.kr/api/sample/folder"
  );

  return (
    <CardContainer>
      {folderData &&
        folderData.folder.links.map((link) => (
          <Card key={link.id}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <CardImage
                src={link.imageSource || noImage}
                alt={link.title || "noImage"}
              />
            </a>
            <CardText>
              <CardTime>{generateTimeText(link.createdAt)}</CardTime>
              <CardDescription>
                <p>{link.description}</p>
              </CardDescription>
              <CardDate>
                <p>{formatDate(link.createdAt)}</p>
              </CardDate>
            </CardText>
          </Card>
        ))}
    </CardContainer>
  );
};

export default Cards;
