import { CollectionItem } from "../slices/collection-slice/collectionSlice";
import { LinkItem } from "../slices/link-slice/linkSlice";

export const mockGetCollections = (): CollectionItem[] => {
  return [
    {
      collectionId: "032023",
      collectionTitle: "Social Media Collection",
    },
    {
      collectionId: "23423",
      collectionTitle: "Software Dev Collection",
    },
    {
      collectionId: "6775675",
      collectionTitle: "Travel Collection",
    },
  ];
};

export const mockGetLinkList = (): LinkItem[] => {
  return [
    {
      linkId: "63435",
      linkTitle: "Netflix",
      linkUrl: "https://www.netflix.com",
    },
    {
      linkId: "83453455",
      linkTitle: "Facebook",
      linkUrl: "https://www.facebook.com",
    },
    {
      linkId: "6345335",
      linkTitle: "Twitch",
      linkUrl: "https://www.twitch.tv",
    },
  ];
};

export const mockGetAuthData = (): any => {
  return {
    token: "sampleToken",
    tokenExpiration: 900,
    userId: "testId",
  };
};
