function *createIterator() {
    console.log(111111111)
    console.log(111111111)
    console.log(111111111)
    console.log(111111111)
}
let iterator = createIterator();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.return()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"