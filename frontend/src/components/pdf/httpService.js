import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const errorcode =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

    console.log(error);
    console.log(errorcode, "errorcode");
  if (!errorcode) window.alert("Something went wrong!!");

  return Promise.reject(error);
});

export default {
  get: axios.get,
};
