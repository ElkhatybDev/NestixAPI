const { faker } = require("@faker-js/faker");
const fs = require("fs");

const USERS_COUNT = 100;
const TRIPS_COUNT = 150;

const generateExperience = (id) => {
  return {
    id,

    userId: faker.number.int({ min: 1, max: USERS_COUNT }),
    tripId: faker.number.int({ min: 1, max: TRIPS_COUNT }),

    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),

    image: faker.image.urlPicsumPhotos(),

    likes: faker.number.int({ min: 0, max: 300 }),

    createdAt: faker.date.past()
  };
};

const generateExperiences = (count) => {
  const experiences = [];

  for (let i = 1; i <= count; i++) {
    experiences.push(generateExperience(i));
  }

  return experiences;
};

const experiences = generateExperiences(150);

fs.writeFileSync(
  "./src/data/experiences.json",
  JSON.stringify(experiences, null, 2)
);

console.log("Experiences generated successfully ");