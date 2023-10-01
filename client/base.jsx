import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";

export function createApp () {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}