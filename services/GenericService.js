// services/GenericService.js
import mongoose from 'mongoose';

class GenericService {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const item = new this.model(data);
        return await item.save();
    }

    async getById(id) {
        return await this.model.findById(id).exec();
    }

    async getAll() {
        return await this.model.find().exec();
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
}

export default GenericService;

  
