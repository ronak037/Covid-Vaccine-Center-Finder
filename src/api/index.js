import axios from "axios";
import Moment from "moment";

const url = "https://cdn-api.co-vin.in/api/v2/admin/location";

export const fetchStates = async () => {
  try {
    const {
      data: { states },
    } = await axios.get(url + "/states");

    return states;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDistrict = async (stateId) => {
  try {
    const {
      data: { districts },
    } = await axios.get(`${url}/districts/${stateId}`);
    // console.log(districts);
    return districts;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSlots = async (districtUserId) => {
  var date = new Date();
  date = Moment(date).format("DD-MM-YYYY");
  const slotUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtUserId}&date=${date}`;

  try {
    const {
      data: { sessions },
    } = await axios.get(slotUrl);

    const sortArray = async (type) => {
      const sortProperty = "available_capacity";
      sessions.sort(
        (first, second) => second[sortProperty] - first[sortProperty]
      );
    };

    sortArray();

    return sessions;
  } catch (error) {
    console.log(error);
  }
};
