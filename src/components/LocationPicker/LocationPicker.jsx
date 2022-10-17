import React, { useState, useEffect } from "react";
import { NativeSelect, Button } from "@material-ui/core";

import styles from "./LocationPicker.module.css";
import { fetchStates, fetchDistrict } from "../../api";

const LocationPicker = ({ setStateUserId, setDistrictUserId }) => {
  const [state, setState] = useState([]); //state data
  const [district, setDistrict] = useState([]);
  const [stateId, setStateId] = useState(0);
  const [districtId, setDistrictId] = useState(0);

  useEffect(() => {
    //fetching statename and state id
    const fetchStateAPI = async () => {
      setState(await fetchStates());
    };
    fetchStateAPI();

    //if any state is selected then we fetch districts
    if (stateId) {
      setDistrictId(null);
      const fetchDistrictAPI = async () => {
        setDistrict(await fetchDistrict(stateId));
      };

      fetchDistrictAPI();
    }

    // console.log(state);
  }, [setState, stateId, setDistrictId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStateUserId(stateId);
    setDistrictUserId(districtId);
  };

  return (
    <form className={styles.formControl} onSubmit={handleSubmit}>
      <NativeSelect
        className={styles.nativeSelect}
        defaultValue=""
        onChange={(event) => {
          setStateId(event.target.value);
          setDistrict([]); //When no state is selected then district array should be null
        }}
      >
        <option value="">Select State</option>
        {state.map((stateDetails) => (
          <option key={stateDetails.state_id} value={stateDetails.state_id}>
            {stateDetails.state_name}
          </option>
        ))}
      </NativeSelect>

      <NativeSelect
        className={styles.nativeSelect}
        defaultValue=""
        onChange={(event) => {
          setDistrictId(event.target.value);
        }}
      >
        <option value="">Select district</option>
        {district.map((districtDetails) => (
          <option
            key={districtDetails.district_id}
            value={districtDetails.district_id}
          >
            {districtDetails.district_name}
          </option>
        ))}
      </NativeSelect>

      <Button
        className={styles.button}
        type="submit"
        variant="contained"
        color="primary"
      >
        Find Centres
      </Button>
    </form>
  );
};

export default LocationPicker;
