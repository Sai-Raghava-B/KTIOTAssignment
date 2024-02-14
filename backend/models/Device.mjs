

import { Schema, model } from 'mongoose';


const deviceSchema = new Schema({
  device_id: {
    type: String,
    required: true
  },
  alloted_to_user: {
    type: Schema.Types.ObjectId, 
    ref: 'customers' 
  },
  state: {
    type: {
      light: {
        type: Number,
        enum: [0, 1] 
      },
      fan: {
        type: Number,
        enum: [0, 1]
      },
      mis: {
        type: Number,
        enum: [0, 1]
      }
    },
    required: true
  }
});
const Device = model('Device', deviceSchema);

export default Device;
