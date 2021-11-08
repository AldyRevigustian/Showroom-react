import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Streaming from "./components/Streaming";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="streaming" element={<Streaming />}>
        <Route path=":streamingId" element={<Streaming />} />
      </Route>

      <Route path="*" element={ <main style={{ padding: "1rem" }}> <p>There's nothing here!</p> </main> }/>
      
    </Routes>
  </BrowserRouter>,
  rootElement
);