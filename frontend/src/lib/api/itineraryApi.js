import axios from "axios";

export class ItineraryApi {
  static async methodHandler(method) {
    switch (method) {
      case "post":
        return ItineraryApi.create;
      case "patch":
        return ItineraryApi.update;
      case "get":
        return ItineraryApi.get;
      case "delete":
        return ItineraryApi.delete;
    }
  }
  static async get(url) {
    return await axios.get(url);
  }
  static async create(url) {}
  static async update(ItineraryId, data) {
    return await axios.patch(`/${ItineraryId}`, data);
  }
  static async delete() {}
}
