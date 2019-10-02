
const mongoId = /^[a-f\d]{24}$/i;

const matchMongoId = {
  _id: expect.stringMatching(mongoId),
  launchDate: expect.any(String)
};

module.exports = {
  mongoId,
  matchMongoId
};