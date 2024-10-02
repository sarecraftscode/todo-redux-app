import './App.css'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import Todos from "./components/Todos.tsx";

function App() {

  return (
    <Provider store={store}>
        <Todos />
    </Provider>
  )
}

export default App
