// LOAD DATA
var friends = require("../app/data/friends");

// ROUTING

module.exports = function(app) {
  // API GET Requests
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests
  app.post("/api/friends", function(req, res) {
    var bestMatch = {
      name: "",
      photo: "",
      difference: Infinity
    };

    var surveyData = req.body;
    var surveyScores = surveyData.scores;

    var scoreDifference;

    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      scoreDifference = 0;

      console.log(currentFriend.name);

      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var userScore = surveyScores[j];

        scoreDifference += Math.abs(parseInt(userScore) - parseInt(currentFriendScore));
      }

      if (scoreDifference <= bestMatch.difference) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.difference = scoreDifference;
      }
    }

    friends.push(surveyData);

    res.json(bestMatch);
  });
};
