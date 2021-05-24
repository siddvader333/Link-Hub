import React from "react";
import AddItemComponent from "../../components/AddItemComponent/AddItemComponent";
import EditLinkModal from "../../components/EditLinkModal/EditLinkModal";
import LinkCollection from "../../components/LinkCollectionComponent/LinkCollection";
import LinkDisplay from "../../components/LinkDisplayComponent/LinkDisplay";

const Dashboard = () => {
  const [viewCollections, setViewCollections] = React.useState(true);
  return (
    <div>
      {viewCollections === true ? (
        <>
          <AddItemComponent text={"+ Add New Link Collection"} />
          <LinkCollection
            collectionId={"124123423"}
            linkTitle={"Social Media Links"}
          />
        </>
      ) : (
        <>
          <AddItemComponent text={"+ Add New Link"} />
          <LinkDisplay
            linkUrl="https://www.netflix.ca"
            linkId="123905782"
            linkTitle="Netflix"
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
