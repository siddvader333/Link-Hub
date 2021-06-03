import { PayloadAction } from "@reduxjs/toolkit";
import linkReducer, {
  addLinkSuccess,
  editLinkSuccess,
  getLinksByCollectionSuccess,
  initialState,
  requestLinkFailure,
  sendLinkRequest,
} from "./linkSlice";

describe("Link Reducer Testing", () => {
  test("should return initial state if no valid action is provided", () => {
    expect(linkReducer(undefined, {} as PayloadAction)).toEqual(initialState);
  });

  test("Should set loading to true when sendLinkRequest Action sent", () => {
    expect(linkReducer(initialState, sendLinkRequest).loading).toEqual(true);
  });

  test("Should add new collection when addCollectionSuccess is called", () => {
    const newState = linkReducer(
      initialState,
      addLinkSuccess({
        linkTitle: "test title",
        linkId: "test id",
        linkUrl: "test url",
      })
    );

    const expectedState = {
      linkList: [
        { linkTitle: "test title", linkId: "test id", linkUrl: "test url" },
      ],
      loading: false,
      errorMessage: undefined,
    };

    expect(newState).toEqual(expectedState);
  });

  test("Should edit link if link exists when editLinkSuccess is called", () => {
    const startState = {
      linkList: [
        {
          linkTitle: "test title",
          linkId: "test id",
          linkUrl: "test url",
        },
      ],
      loading: true,
      errorMessage: undefined,
      selectedCollectionId: undefined,
      selectedCollectionTitle: undefined,
    };

    const expectedState = {
      linkList: [
        {
          linkTitle: "new test title",
          linkId: "test id",
          linkUrl: "new test url",
        },
      ],
      loading: false,
      errorMessage: undefined,
      selectedCollectionId: undefined,
      selectedCollectionTitle: undefined,
    };

    const newState = linkReducer(
      startState,
      editLinkSuccess({
        linkTitle: "new test title",
        linkId: "test id",
        linkUrl: "new test url",
      })
    );

    expect(newState).toEqual(expectedState);
  });

  test("Should not edit link if link does not exists when editLinkSuccess is called", () => {
    const startState = {
      linkList: [
        {
          linkTitle: "test title",
          linkId: "test id",
          linkUrl: "test url",
        },
      ],
      loading: false,
      errorMessage: undefined,
      selectedCollectionId: undefined,
      selectedCollectionTitle: undefined,
    };

    const newState = linkReducer(
      startState,
      editLinkSuccess({
        linkTitle: "new test title",
        linkId: "wrong test id",
        linkUrl: "new test url",
      })
    );

    expect(newState).toEqual(startState);
  });

  test("should get links from specific collection with payload collectionId when getLinksByCollectionSuccess", () => {
    const linkList = [
      {
        linkTitle: "test title",
        linkId: "test id",
        linkUrl: "test url",
      },
    ];

    const expectedState = {
      linkList: [
        {
          linkTitle: "test title",
          linkId: "test id",
          linkUrl: "test url",
        },
      ],
      selectedCollectionId: "test id",
      selectedCollectionTitle: "test title",
      loading: false,
      errorMessage: undefined,
    };

    const newState = linkReducer(
      initialState,
      getLinksByCollectionSuccess({
        linkList: linkList,
        selectedCollectionId: "test id",
        selectedCollectionTitle: "test title",
      })
    );
    expect(newState).toEqual(expectedState);
  });

  test("error message in state should set when requestLinkFailure", () => {
    const newState = linkReducer(
      initialState,
      requestLinkFailure({ errorMessage: "test error message" })
    );
    expect(newState.errorMessage).toEqual("test error message");
    expect(newState.loading).toEqual(false);
  });
});
