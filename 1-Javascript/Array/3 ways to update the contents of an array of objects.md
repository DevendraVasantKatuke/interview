##### common
```
import faker from "faker";

const userCreator = () => ({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    avatar: faker.name.avatar(),
    id: faker.random.number(5)
});

const array = [...new Array(5)]
    .map(() => useCreator());
```
##### 1.
```
arr[0] = {
    ...array[0],
    name: "Actualizado"
}
```
##### 2.
```
const newArray = array.map(item => {
    if (item.id === 3) {
        return {...item, name: "Actualizado"}
    }
    return item;
})
```
##### 3.
```
const index = array.findIndex(item => item.id === 3);

const newItem = {...array[index], name: "Actualizado"}

const newArray = [...array.slice(0, index), newItem, ...array.slice(index)];
```