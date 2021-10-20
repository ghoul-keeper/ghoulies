// Timeouts are for dramatic effect....
const superagent = require("superagent");

let tweetId = "1450898194078978052";
let twitterUrl = `https://api.twitter.com/1.1/statuses/retweets/${tweetId}`;
let lookupUserUrl = (id) => `https://api.twitter.com/2/users/${id}`;

console.log("Getting tweet....");
setTimeout(() => {
  superagent
    .get(twitterUrl)
    .set("Authorization", `Bearer ${process.env.TWITTER_TOKEN}`)
    .accept("application/json")
    .then((res) => {
      console.log("Got tweet. Finding a user...");
      setTimeout(() => {
        let response = res.body;
        let allUsers = response.map((r) => {
          return r.user.screen_name;
        });

        var randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];

        console.log("🎉 Winner of the Ghoulie giveaway!! 🎉", randomUser);
      }, 1000);
    })
    .catch((err) => {
      console.error(err);
    });
}, 1000);
