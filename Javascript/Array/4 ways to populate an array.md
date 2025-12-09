```
import faker from "faker";

const userCreator = () => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar()
});

// Forma 1: Array Fill
let array = new Array(5).fill(3);
array = new Array(5).fill(userCreator());
array = new Array(5).fill(null).map(() => userCreator());

// Forma 2: For loop
array = new Array(5);
for (let i = 0; i < 5; i++) {
  array[i] = userCreator();
}
// Forma 3: Array.from
array = Array.from({ length: 5 }, () => userCreator());

// Forma 4: Array spread
array = [...new Array(5)].map(() => userCreator());

console.log(array);
```