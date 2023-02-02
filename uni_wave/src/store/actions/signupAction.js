import axios from "axios";

export default function signupAction(data) {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/josn",
        },
      };
      // fetch data from API 
      // REGISTRATION
      await axios.post("http://localhost:8000/api/uniwave/register", data, config);
    } catch (error) {
      console.log(error);
    }
    
  };
}
