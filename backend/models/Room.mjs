
import { Schema, model } from 'mongoose';

const roomSchema = new Schema({
  room_id: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  device_id: {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  room_name: {
    type: String,
    required: true
  }
});

const Room = model('Room', roomSchema);

export default Room;
