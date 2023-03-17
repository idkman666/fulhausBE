import mongoose from "mongoose";
import mongoosePeginate from 'mongoose-paginate';

const AcronymSchema = mongoose.Schema({
    acronym: {
        type: String,
        required: true
    },
    definition: {
        type:String,
        required: true
    }
})
AcronymSchema.plugin(mongoosePeginate);
const AcronymModel = mongoose.model('Acronym', AcronymSchema);
export default AcronymModel;