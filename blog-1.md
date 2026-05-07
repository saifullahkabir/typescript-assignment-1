# `unknown` কেনো `any` থেকে safer?

## Introduction

TypeScript ব্যবহার করার সময় আমরা অনেক সময় এমন data নিয়ে কাজ করি যার type আগে থেকে জানা থাকে না। আমরা অনেক সময় `any` ব্যবহার করি, কিন্তু `any` TypeScript এর type safety প্রায় বন্ধ করে দেয়। এজন্যই একে অনেক সময় “type safety hole” বলা হয়। অন্যদিকে `unknown` আমাদের safer উপায়ে unknown data handle করতে সাহায্য করে।

---

## `any` কেন Problematic?

যখন কোনো variable এর type `any` করা হয়, তখন TypeScript আর সেই variable নিয়ে কোনো checking করে না। ফলে ভুল code লিখলেও error দেখায় না।

### Example

```ts
let userInput: any = "Next Level";

// কোনো error দেবে না, কিন্তু বিপদ ডেকে আনছে
userInput = 42;
userInput = true;
userInput = { name: "Rana" };

// এই লাইনগুলো TypeScript এ error দেবে না, কিন্তু রানটাইমে crash করবে
userInput.toUpperCase(); // userInput যদি সংখ্যা হয়?
userInput.push(10); // userInput যদি অবজেক্ট হয়?
userInput.name.toLowerCase(); // undefined এ method কল?
```

এই কারণেই `any` dangerous হতে পারে।

---

## `unknown` কেন Safer?

`unknown` type ব্যবহার করলে TypeScript আগে check করে যে data আসলে কোন type এর। Type check ছাড়া data ব্যবহার করা যায় না।

### Example

```ts
const value: unknown = "Next Level";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

এখানে `typeof` check করার পরে TypeScript বুঝতে পারে এটি string। তারপর safe ভাবে method ব্যবহার করা যায়।

---

## Type Narrowing কী?

Type narrowing হলো কোনো variable এর actual type check করে তাকে specific type এ নিয়ে আসা।

TypeScript এ সাধারণত নিচের techniques দিয়ে narrowing করা হয়:

1. `typeof`
2. `instanceof`
3. `in` operator

### `typeof` Example

```ts
type StringOrNumber = string | number;

const checkType = (value: StringOrNumber) => {
  if (typeof value === "string") {
    return "String";
  } else if (typeof value === "number") {
    return "Number";
  }
};
```

### `instanceof` Example

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  getSleeop(numOfHours: number) {
    console.log(`${this.name} sleeps ${numOfHours} hours a day`);
  }
}

class Student extends Person {
  constructor(name: string) {
    super(name);
  }
  doStudy(numOfHours: number) {
    console.log(`${this.name} studies ${numOfHours} hours a day`);
  }
}

class Teacher extends Person {
  constructor(name: string) {
    super(name);
  }
  takeClass(numOfHours: number) {
    console.log(`${this.name} takes ${numOfHours} hours of classes daily`);
  }
}

const isStudent = (user: Person) => {
  return user instanceof Student  // user is Student
}

const isTeacher = (user: Person) => {
  return user instanceof Teacher; // user is Teacher
}

const getUserInfo = (user: Person) => {
  if (isStudent(user)) {
    user.doStudy(8);
  } else if (isTeacher(user)) {
    user.takeClass(6);
  } else {
    user.getSleeop(10);
  }
};

const student1 = new Student("Mr. Student");
const teacher1 = new Teacher("Mr. Teacher");
getUserInfo(teacher1);

```

### `in` Example

```ts
type NormalUser = {
  name: string;
};

type AdminUser = {
  name: string;
  role: "Admin";
};

const getUserInfo = (user: NormalUser | AdminUser) => {
  if ("role" in user) {
    console.log(`${user.name} and his role is: ${user.role}`);
  } else{
    console.log(`${user.name}`);
  }
};

getUserInfo({name: "Normal", role: "Admin"});

```

## Conclusion

TypeScript এর মূল উদ্দেশ্য হলো safer code লেখা। `any` ব্যবহার করলে সেই safety অনেকটাই নষ্ট হয়ে যায়। অন্যদিকে `unknown` type check করতে বাধ্য করে এবং application কে বেশি reliable করে তোলে। তাই unpredictable data handle করার সময় `unknown` ব্যবহার করাই better practice।
