const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    score: {
      homeTeam: { type: Number, default: 0 },
      awayTeam: { type: Number, default: 0 },
    },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
