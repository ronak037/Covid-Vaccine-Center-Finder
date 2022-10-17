import React, { useState } from "react";
import LocationPicker from "./components/LocationPicker/LocationPicker.jsx";
import Slots from "./components/Slots/Slots.jsx";

import styles from "./App.module.css";

function App() {
  const [stateUserId, setStateUserId] = useState(0);
  const [districtUserId, setDistrictUserId] = useState(0);

  return (
    <div className={styles.container}>
      <LocationPicker
        setStateUserId={setStateUserId}
        setDistrictUserId={setDistrictUserId}
      />

      <Slots stateUserId={stateUserId} districtUserId={districtUserId} />
    </div>
  );
}

export default App;
