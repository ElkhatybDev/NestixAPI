const { faker } = require("@faker-js/faker");
const fs = require("fs");

// خاصهم يكونو نفس عدد users و trips
const USERS_COUNT = 100;
const TRIPS_COUNT = 150;

const statuses = ["pending", "confirmed", "cancelled"];

const generateBooking = (id) => {
  const travelers = faker.number.int({ min: 1, max: 5 });

  const pricePerPerson = faker.number.int({ min: 500, max: 5000 });

  return {
    id,

    userId: faker.number.int({ min: 1, max: USERS_COUNT }),
    tripId: faker.number.int({ min: 1, max: TRIPS_COUNT }),

    travelers,

    totalPrice: travelers * pricePerPerson, 

    status: faker.helpers.arrayElement(statuses),

    bookingDate: faker.date.past(),
    createdAt: faker.date.past()
  };
};

const generateBookings = (count) => {
  const bookings = [];

  for (let i = 1; i <= count; i++) {
    bookings.push(generateBooking(i));
  }

  return bookings;
};


const bookings = generateBookings(200);

fs.writeFileSync(
  "./src/data/bookings.json",
  JSON.stringify(bookings, null, 2)
);

console.log("Bookings generated successfully ✅");