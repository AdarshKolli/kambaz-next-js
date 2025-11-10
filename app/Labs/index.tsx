import store from "./store";
import { Provider } from "react-redux";
export default function Labs() {
  return (
    <Provider store={store}>
      <div className="container-fluid">
        <h1>Labs</h1>
        ...
      </div>
    </Provider>
  );
}
