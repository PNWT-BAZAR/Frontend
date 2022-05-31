import axios from "axios";
import dev from "../assets/config/dev";

const environment = dev;

export default axios.create({
  baseURL: environment.baseAPIPath,
});
