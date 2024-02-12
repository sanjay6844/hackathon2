import cloneDeep from "lodash/cloneDeep";
import { setNamespace, setApiError } from "Utilities/helpers";
import Network from "Utilities/network";
import {openDB} from "idb"
const namespace = "dashboard";
const createAction = setNamespace(namespace);
const nw = new Network();

// STORE
const initialState = {
  apiError: null,
  testData: null,
  users:null,
};

// ACTIONS

const ASSIGN_TO_DASHBOARD_STORE = createAction("ASSIGN_TO_DASHBOARD_STORE");
const RESET_DASHBOARD_STORE = createAction("RESET_DASHBOARD_STORE");

const assignToDashboardStore = (type, payload) => ({
  type: ASSIGN_TO_DASHBOARD_STORE,
  meta: {
    type,
    payload,
  },
});

const resetDashboardStore = () => (dispatch) => {
  dispatch({
    type: RESET_DASHBOARD_STORE,
    meta: {
      payload: null,
    },
  });
};

// METHODS
// const getAllRequetUser = () => (dispatch) => {
//   dispatch(assignToDashboardStore("testData", null));
//   return nw
//     .api("testFetch")
//     .get()
//     .then((response) => {
//       dispatch(assignToDashboardStore("testData", response?.data));
//     })
//     .catch((error) => {
//       setApiError(dispatch, assignToDashboardStore, error);
//     });
// };

//Use If need DB json
const getAllRequetUser = () => (dispatch) => {
  dispatch(assignToDashboardStore("get_Posts", null));
  return nw
    .api("get_Posts")
    .get()
    .then((response) => {
      dispatch(assignToDashboardStore("testData", response?.data));
    })
    .catch((error) => {
      setApiError(dispatch, assignToDashboardStore, error);
    });
};


const postUsers = (data)=>async(dispatch)=>{
  const usersDb = await openDB("db1",1)
  usersDb.add("users",data)
}

const fetchUsers = () => (dispatch) => {
  dispatch(assignToDashboardStore("get_Posts", null));
  return nw
  
    .then((response) => {
      dispatch(assignToDashboardStore("testData", response?.data));
    })
    .catch((error) => {
      setApiError(dispatch, assignToDashboardStore, error);
    });
};


// Routing

// Reducers
const dashboardReducer = (state = initialState, action) => {
  const localState = cloneDeep(state);

  switch (action.type) {
  case ASSIGN_TO_DASHBOARD_STORE:
    localState[action.meta.type] = action.meta.payload;
    return { ...localState };
  case RESET_DASHBOARD_STORE:
    return initialState;
  default:
    return localState;
  }
};

export default {
  namespace,
  store: initialState,
  reducer: dashboardReducer,
  creators: {
    assignToDashboardStore,
    resetDashboardStore,
    getAllRequetUser,
    postUsers
  },
};
