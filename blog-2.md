# Generics কীভাবে Reusable এবং Type-Safe Code তৈরি করতে সাহায্য করে?

## Introduction

TypeScript এর সবচেয়ে powerful feature গুলোর মধ্যে Generics অন্যতম। Generics ব্যবহার করে এমন function, class বা component তৈরি করা যায় যা বিভিন্ন ধরনের data এর সাথে কাজ করতে পারে, এবং type safety নষ্ট হয় না। এর ফলে একই logic বারবার লিখতে হয় না এবং code আরও reusable হয়ে যায়।

---

## Generics কী?

Generics হলো এমন একটি feature যা function বা class কে flexible করে তোলে। এটি data type কে parameter হিসেবে গ্রহণ করতে পারে।

### Example

```ts
const getValue = <T>(value: T) => {
  return value;
};
```

এখানে `T` একটি generic type parameter।

---

## Generics কীভাবে কাজ করে?

একই function বিভিন্ন ধরনের data এর সাথে কাজ করতে পারে।

### Example

```ts
getValue<string>("Hello");
getValue<number>(100);
```

এখানে একই function string এবং number — দুই ধরনের data handle করছে।

---

## Generics কেন দরকার?

Generics ব্যবহার করলে:

* একই code বারবার লিখতে হয় না
* reusable function তৈরি করা যায়
* type safety বজায় থাকে
* TypeScript exact return type বুঝতে পারে

---

## Real Example

```ts
const getProperty = <X, Y extends keyof X>(obj: X, key: Y): X[Y] => {
  return obj[key];
};
```

### Usage

```ts
const user = {
  id: 1,
  name: "John Doe",
  age: 21,
};

getProperty(user, "name");
```

এখানে generic ব্যবহার করার কারণে function টি যেকোনো object এর property safely return করতে পারছে।

---

## Type Safety কীভাবে Maintain হয়?

Generics TypeScript কে actual type track করতে সাহায্য করে। ভুল data pass করলে TypeScript compile time এই error দেখায়।

### Example

```ts
getProperty(user, "salary");
```

এখানে `salary` property object এ না থাকলে TypeScript error দিবে।

---

## Conclusion

Generics TypeScript এর একটি গুরুত্বপূর্ণ feature কারণ এটি reusable এবং flexible code লিখতে সাহায্য করে, আবার একই সাথে strong type safety বজায় রাখে। বড় project এ clean এবং maintainable code লেখার জন্য Generics অনেক useful।