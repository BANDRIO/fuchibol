const Match = require('../models/matchModel');
const { sendMatchInvitation } = require('../../services/calendar');

exports.createMatch = async (req, res) => {
  try {
    const { name, location, datetime, participants } = req.body;

    const match = await Match.create({
      name,
      location,
      datetime,
      participants,
    });

    // Send calendar invitations to all participants
    await sendMatchInvitation(name, location, datetime, participants);

    res.status(201).json({
      status: 'success',
      data: {
        match,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();

    res.status(200).json({
      status: 'success',
      results: matches.length,
      data: {
        matches,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};
