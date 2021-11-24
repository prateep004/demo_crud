import axios from "axios";

class MainAxios {
  constructor() {
    this.init();
  }

  init() {
    this.instance = axios.create({
      baseURL: "api/v1",
      responseType: 'json',
      //   timeout: 1000,
      //   headers: { "X-Custom-Header": "foobar" },
    });
  }
}
export const mainAxios = new MainAxios();
