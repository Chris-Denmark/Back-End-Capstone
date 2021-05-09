import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { BoardProvider } from "./providers/BoardProvider";
import { DeckMaterialProvider } from "./providers/DeckMaterialProvider";
import { BoardTypeProvider } from "./providers/BoardTypeProvider";
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <DeckMaterialProvider>
          <BoardTypeProvider>
            <BoardProvider>
              <Header />
              <ApplicationViews />
            </BoardProvider>
          </BoardTypeProvider>
        </DeckMaterialProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
