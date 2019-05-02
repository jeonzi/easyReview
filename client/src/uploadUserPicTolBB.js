import Axios from "axios";

const CORS = "https://cors-anywhere.herokuapp.com/";
const UPLOAD_URL = "https://api.imgbb.com/1/upload";
const IMAGEBB_KEY = "85b4f498395de498b752831113b0ed2e";

export const uploadPic = async image => {
  const url = `${CORS}${UPLOAD_URL}`;
  const formData = new FormData();
  formData.append("key", IMAGEBB_KEY);
  formData.append("image", image);
  try {
    const result = await Axios.post(url, formData);
    return result.data.data.display_url;
  } catch (error) {
    console.log(error);
  }
};
