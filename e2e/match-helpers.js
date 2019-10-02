
const mongoId = /^[a-f\d]{24}$/i;

const matchIdAndDate = {
  _id: expect.stringMatching(mongoId),
  launchDate: expect.any(String)
};

const matchMongoId = {
  _id: expect.stringMatching(mongoId),
};

module.exports = {
  mongoId,
  matchMongoId,
  matchIdAndDate
};