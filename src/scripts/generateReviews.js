const { faker } = require("@faker-js/faker");
const fs = require("fs");

const USERS_COUNT = 100;
const TRIPS_COUNT = 150;

const generateReview = (id) => {
  return {
    id,

    userId: faker.number.int({ min: 1, max: USERS_COUNT }),
    tripId: faker.number.int({ min: 1, max: TRIPS_COUNT }),

    rating: faker.number.int({ min: 1, max: 5 }),

    comment: faker.lorem.sentence(),

    createdAt: faker.date.past()
  };
};

const generateReviews = (count) => {
  const reviews = [];

  for (let i = 1; i <= count; i++) {
    reviews.push(generateReview(i));
  }

  return reviews;
};


const reviews = generateReviews(300);

fs.writeFileSync(
  "./src/data/reviews.json",
  JSON.stringify(reviews, null, 2)
);

console.log("Reviews generated successfully ");