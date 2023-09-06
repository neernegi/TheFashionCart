import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux/es/exports";
import { store } from "./redux/store.ts";
import { AuthProvider } from "./pages/context/useAuth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AuthProvider>
);
