import axios from 'axios'
export class DestinationApi{
	static async get() {}
	static async create() {}
	static async update(DestinationId, data) {
		return await axios.patch(`/destination/editDestination/${DestinationId}`, data);
	}
	static async delete() {}
}