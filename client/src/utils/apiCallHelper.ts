/*Helper Function for handling automatic access token refresh when making API Call */

// import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { refreshAccessTokenSuccess } from "../slices/auth-slice/authSlice";
// export interface APIRequestParameters {
//   method: string | undefined;
//   body: Object;
//   dispatch: () => any;
//   useAppSelector: () => any;
// }

// const makeApiRequestWithAuthRefresh = async (params: APIRequestParameters) => {
//   const { method, body } = params;
//   /* Make API Request with Access Token in state*/
//   const accessToken = useAppSelector((state) => state.auth.authData.token);
//   const dispatch = useAppDispatch();

//   let res = await fetch("http://localhost:5000/graphql", {
//     method: method,
//     body: JSON.stringify(body),
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + accessToken,
//     },
//   });

//   let resJson = await res.json();

//   if (resJson.errors !== undefined) {
//     /*Request Suceeded*/
//     return resJson;
//   }

//   /*If API Request fails due to access token invalid, try and refresh token */
//   if (resJson.errors[0].message === "Unauthenticated. Please login.") {
//     //Access token expired or missing
//     const refreshAccessTokenBody = {
//       query: `query {
//         refreshAccessToken {
//           userId
//           token
//           tokenExpiration
//         }
//       }`,
//     };
//     let res = await fetch("http://localhost:5000/graphql", {
//       method: method,
//       body: JSON.stringify(refreshAccessTokenBody),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + accessToken,
//       },
//     });

//     /*If refresh succeeds, make API Request again */
//     resJson = await res.json();
//     if (resJson.errors !== undefined) {
//       dispatch(refreshAccessTokenSuccess(resJson.data));
//       res = await fetch("http://localhost:5000/graphql", {
//         method: method,
//         body: JSON.stringify(body),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + accessToken,
//         },
//       });

//       resJson = await res.json();
//       return resJson;
//     } else {
//       /*If refresh fails, force login */
//       throw new Error("Unable to Authenticate Request");
//     }
//   }
// };

const x = 5;
export default x;
