import {combineReducers} from "redux";
import eventListReducer from "./eventListReducer";


const rootReducer = combineReducers({
    eventList: eventListReducer,

})
type RootState = typeof rootReducer;
export type AppStateType = ReturnType<RootState>
export default rootReducer


