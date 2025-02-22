import { createStore, combineReducers } from "redux";
import DemandeReducer from "./Components/Reducers/DemandeReducer";
import userReducer from "./Components/Reducers/userReducer";


const rootReducer = combineReducers({
    user: userReducer,
    DemandeReducer,
});

const store = createStore(rootReducer);

export default store;
