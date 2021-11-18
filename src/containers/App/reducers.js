import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as reduxFormReducer } from "redux-form";
import { createBrowserHistory } from "history";
import {
  themeReducer,
  rtlReducer,
  cryptoTableReducer,
  customizerReducer,
  newOrderTableReducer,
  sidebarReducer,
  authReducer,
  auth,
  Users
} from "../../redux/reducers/index";
import appConfigReducer from "../../redux/reducers/appConfigReducer";
import covidReducer from "../Maps/VectorMapWithRequestData/redux/covidReducer";
import todoReducer from "../Todo/redux/reducer";

const history = createBrowserHistory();
const rootReducer = combineReducers({
  router: connectRouter(history),
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  rtl: rtlReducer,
  appConfig: appConfigReducer,
  cryptoTable: cryptoTableReducer,
  customizer: customizerReducer,
  newOrder: newOrderTableReducer,
  sidebar: sidebarReducer,
  user: authReducer,
  covid: covidReducer,
  todo: todoReducer,
  auth: auth,
  Users:Users,
});
export default rootReducer;
