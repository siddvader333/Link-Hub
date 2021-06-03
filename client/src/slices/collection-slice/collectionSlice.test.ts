import { PayloadAction } from "@reduxjs/toolkit";
import collectionReducer, {
  addCollectionSuccess,
  editCollectionSuccess,
  hydrateCollectionList,
  initialState,
  requestCollectionFailure,
  sendCollectionRequest,
} from "./collectionSlice";

describe("Collections Reducer Testing", () => {
  test("should return initial state if no valid action is provided", () => {
    expect(collectionReducer(undefined, {} as PayloadAction)).toEqual(
      initialState
    );
  });

  test("Should set loading to true when sendCollectionRequest Action sent", () => {
    expect(
      collectionReducer(initialState, sendCollectionRequest).loading
    ).toEqual(true);
  });

  test("Should add new collection when addCollectionSuccess is called", () => {
    const newState = collectionReducer(
      initialState,
      addCollectionSuccess({
        collectionTitle: "test title",
        collectionId: "test id",
      })
    );

    const expectedState = {
      collectionList: [
        { collectionTitle: "test title", collectionId: "test id" },
      ],
      loading: false,
      errorMessage: undefined,
    };

    expect(newState).toEqual(expectedState);
  });

  test("Should edit collection if collection exists when editCollectionSuccess is called", () => {
    const startState = {
      collectionList: [
        {
          collectionTitle: "test title",
          collectionId: "test id",
        },
      ],
      loading: true,
      errorMessage: undefined,
    };

    const expectedState = {
      collectionList: [
        {
          collectionTitle: "new test title",
          collectionId: "test id",
        },
      ],
      loading: false,
      errorMessage: undefined,
    };

    const newState = collectionReducer(
      startState,
      editCollectionSuccess({
        collectionId: "test id",
        collectionTitle: "new test title",
      })
    );

    expect(newState).toEqual(expectedState);
  });

  test("Should not edit collection if collection does not exists when editCollectionSuccess is called", () => {
    const startState = {
      collectionList: [
        {
          collectionTitle: "test title",
          collectionId: "test id",
        },
      ],
      loading: true,
      errorMessage: undefined,
    };

    const expectedState = {
      collectionList: [
        {
          collectionTitle: "test title",
          collectionId: "test id",
        },
      ],
      loading: false,
      errorMessage: undefined,
    };

    const newState = collectionReducer(
      startState,
      editCollectionSuccess({
        collectionId: "wrong test id",
        collectionTitle: "new test title",
      })
    );

    expect(newState).toEqual(expectedState);
  });

  test("should hydrate store collection list with payload list when hydrateColelctionList", () => {
    const collectionList = [
      { collectionTitle: "test title", collectionId: "test id" },
    ];

    const expectedState = {
      collectionList: [
        {
          collectionTitle: "test title",
          collectionId: "test id",
        },
      ],
      loading: false,
      errorMessage: undefined,
    };

    const newState = collectionReducer(
      initialState,
      hydrateCollectionList({ collectionList: collectionList })
    );
    expect(newState).toEqual(expectedState);
  });

  test("error message in state should set when requestCollectionFailure", () => {
    const newState = collectionReducer(
      initialState,
      requestCollectionFailure({ errorMessage: "test error message" })
    );
    expect(newState.errorMessage).toEqual("test error message");
    expect(newState.loading).toEqual(false);
  });
});
