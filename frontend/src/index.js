import ReactDOM from "react-dom";
import App from "./components/App.component";
import { Provider } from "react-redux";
import store from "./redux/store";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
    );