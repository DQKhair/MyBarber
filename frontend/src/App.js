import React from "react";
import AppRouter from "./routes/AppRoutes";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        
      />
      <AppRouter />
    </div>
  );
}

export default App;
