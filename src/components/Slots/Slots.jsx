import React, { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  CardContent,
  Typography,
  Card,
  CardHeader,
  CardActions,
} from "@material-ui/core";
import { fetchSlots } from "../../api";

import styles from "./Slots.module.css";

const Slots = ({ stateUserId, districtUserId }) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlotsAPI = async () => {
      setSlots(await fetchSlots(districtUserId));
    };

    if (districtUserId !== 0) {
      fetchSlotsAPI();
    }
  }, [districtUserId]);

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        {slots.map((slot, index) => (
          <Grid
            className={
              slot.fee_type === "Paid" ? styles.slot_paid : styles.slot_free
            }
            key={index}
            item
            xs={12}
            sm={5}
            md={3}
            component={Card}
          >
            <CardHeader
              className={styles.header}
              avatar={
                <Avatar
                  className={
                    slot.min_age_limit === 18
                      ? styles.avatar_18
                      : styles.avatar_45
                  }
                >
                  {slot.min_age_limit}+
                </Avatar>
              }
              title={slot.name.toLowerCase()}
              subheader={slot.address.toLowerCase()}
            />

            <CardContent>
              <Typography variant="body2">
                Slots available: {slot.available_capacity}
              </Typography>
              <Typography variant="body2">
                Vaccine Type: {slot.vaccine}
              </Typography>
            </CardContent>

            <CardActions disableSpacing>
              <Typography>{slot.fee_type}</Typography>
              {slot.fee_type === "Paid" ? (
                <Typography className={styles.fee}>{slot.fee}</Typography>
              ) : null}
            </CardActions>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Slots;
