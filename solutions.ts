const filterEvenNumbers = (numbers: number[]): number[] => {
  return numbers.filter((number) => number % 2 === 0);
};


const reverseString = (input: string): string => {
  const reversed = input.split("").reverse().join("");
  return reversed;
};


type StringOrNumber = string | number;
const checkType = (value: StringOrNumber) => {
  if (typeof value === "string") {
    return "String";
  } else if (typeof value === "number") {
    return "Number";
  }
};


const getProperty = <X, Y extends keyof X>(obj: X, key: Y): X[Y] => {
  return obj[key];
};


interface Book {
  title: string;
  author: string;
  publishedYear: number;
}
const toggleReadStatus = (book: Book) => {
  return {
    ...book,
    isRead: true,
  };
};


class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  getDetails() {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}


const getIntersection = (array1: number[], array2: number[]): number[] => {
  const newArr: number[] = [];

  array1.forEach((number) => {
    if (array2.includes(number)) {
      newArr.push(number);
    }
  });

  return newArr;
};
