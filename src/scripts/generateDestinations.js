const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generateDestination = (id) => {
    return {
    id,

    name: faker.location.city(),
    country: faker.location.country(),

    description: faker.lorem.sentence(),

    image: faker.image.urlPicsumPhotos(),

    rating: faker.number.float({ min: 3, max: 5, precision: 0.1 }),

    createdAt: faker.date.past()
    };
};

const generateDestinations = (count) => {
    const destinations = [];

    for (let i = 1; i <= count; i++) {
    destinations.push(generateDestination(i));
    }

    return destinations;
};

// عدد destinations
const destinations = generateDestinations(30);

fs.writeFileSync(
    "./src/data/destinations.json",
    JSON.stringify(destinations, null, 2)
);

console.log("Destinations generated successfully ");