const { faker } = require("@faker-js/faker");
const fs = require("fs");


const USERS_COUNT = 100;

const generatePost = (id) => {
    return {
    id,

    userId: faker.number.int({ min: 1, max: USERS_COUNT }),

    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),

    tags: faker.helpers.arrayElements(
        ["travel", "food", "city", "nature", "beach", "adventure"],
        { min: 1, max: 3 }
    ),

    image: faker.image.urlPicsumPhotos(),

    likes: faker.number.int({ min: 0, max: 500 }),
    views: faker.number.int({ min: 0, max: 2000 }),

    isPublished: true,

    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
    };
};

const generatePosts = (count) => {
    const posts = [];

    for (let i = 1; i <= count; i++) {
    posts.push(generatePost(i));
    }

    return posts;
};


const posts = generatePosts(200);


fs.writeFileSync(
    "./src/data/posts.json",
    JSON.stringify(posts, null, 2)
);

console.log("Posts generated successfully");