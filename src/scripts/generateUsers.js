const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generateUser = (id) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
    id,

    firstName,
    lastName,
    username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@nestixapi.com`,
    phone: faker.phone.number(),

    age: faker.number.int({ min: 18, max: 60 }),
    gender: faker.person.sex(),
    birthDate: faker.date.birthdate({ min: 18, max: 60, mode: "age" }),

    address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country()
    },

    image: faker.helpers.arrayElement([
    faker.image.avatar(),
    `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=F97316&color=fff`
    ]),

    role: faker.helpers.arrayElement(["user", "admin"]),
    isActive: faker.datatype.boolean(),

    createdAt: faker.date.past()
    };
};


const generateUsers = (count) => {
    const users = [];

    for (let i = 1; i <= count; i++) {
    users.push(generateUser(i));
    }

    return users;
};


const users = generateUsers(100);


fs.writeFileSync(
    "./src/data/users.json",
    JSON.stringify(users, null, 2)
);

console.log("Users generated successfully ");
