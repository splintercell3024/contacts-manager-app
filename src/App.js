import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { useReducer } from "react";
import { ContactContext } from "./context/contactContext";
import { initialState,reducer } from "./reducer/contactReducer";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRoutes(routes);
  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {router}
    </ContactContext.Provider>
  );
}
export default App;
