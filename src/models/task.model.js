const { Schema, Model } = require('mongoose');

// schema
const taskSchema = new Schema({
  name: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

// model
const Task = Model('Task', taskSchema);

module.exports = Task;
