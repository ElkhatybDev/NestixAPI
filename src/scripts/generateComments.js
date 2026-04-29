const { faker } = require("@faker-js/faker");
const fs = require("fs");


const USERS_COUNT = 100;
const POSTS_COUNT = 200;

const generateComment = (id) => {
    return {
    id,

    postId: faker.number.int({ min: 1, max: POSTS_COUNT }),
    userId: faker.number.int({ min: 1, max: USERS_COUNT }),

    body: faker.lorem.sentence(),

    likes: faker.number.int({ min: 0, max: 100 }),

    createdAt: faker.date.recent()
    };
};

const generateComments = (count) => {
    const comments = [];

    for (let i = 1; i <= count; i++) {
    comments.push(generateComment(i));
    }

    return comments;
};


const comments = generateComments(300);

fs.writeFileSync(
    "./src/data/comments.json",
    JSON.stringify(comments, null, 2)
);

console.log("Comments generated successfully ✅");