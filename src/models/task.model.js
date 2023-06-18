const { Schema, model } = require('mongoose');

// schema
const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Must provide name'],
      trim: true,
      minlength: [4, 'name can not be less than 4 characters'],
      maxlength: [20, 'name can not be more than 20 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// model
const Task = model('Task', taskSchema);

module.exports = Task;
