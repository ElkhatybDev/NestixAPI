const { faker } = require("@faker-js/faker");
const fs = require("fs");

const DESTINATIONS_COUNT = 30;

const generateTrip = (id) => {
  return {
    id,

    destinationId: faker.number.int({ min: 1, max: DESTINATIONS_COUNT }),

    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),

    price: faker.number.int({ min: 500, max: 5000 }),
    duration: faker.number.int({ min: 1, max: 10 }),

    image: faker.image.urlPicsumPhotos(),

    rating: faker.number.float({ min: 3, max: 5, precision: 0.1 }),

    maxPeople: faker.number.int({ min: 5, max: 20 }),

    startDate: faker.date.future(),    

    isAvailable: faker.datatype.boolean(),

    createdAt: faker.date.past()
  };
};

const generateTrips = (count) => {
  const trips = [];

  for (let i = 1; i <= count; i++) {
    trips.push(generateTrip(i));
  }

  return trips;
};

// عدد trips
const trips = generateTrips(150);

fs.writeFileSync(
  "./src/data/trips.json",
  JSON.stringify(trips, null, 2)
);

console.log("Trips generated successfully ");