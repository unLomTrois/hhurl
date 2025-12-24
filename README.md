# hhurl

hhurl is a wrapper around URL API to simplify building urls for [HeadHunter](https://hh.ru/) API by using chainable methods:

```typescript
const hh = new HHURL()
const vacancies = 
    hh
    .vacancies()
    .text("javascript")
    .area("1")
    .per_page(100)
    .clusters(true)
    .toString();

// https://api.hh.ru/vacancies?text=javascript&area=1&per_page=100&clusteres=true
```

These methods are not only for building urls, but also for validation and type safety.

For example, `per_page` method will throw an error if you try to set a value that is not an integer or is less than 0 or greater than 100, or with a page number that would result in more than 2000 vacancies.

```typescript
const hh = new HHURL();
hh.vacancies().per_page(1.5); // throws an error
hh.vacancies().per_page(-100); // throws an error
hh.vacancies().per_page(101); // throws an error
hh.vacancies().per_page(100).page(20); // throws an error (>=2000)
```

Methods are also "toggleable", so you can pass a boolean value to enable or disable a parameter:

```typescript
const hh = new HHURL();
hh.vacancies().clusters(true); // https://api.hh.ru/vacancies?clusters=true
hh.vacancies().clusters(false); // https://api.hh.ru/vacancies
```


Currently it supports only vacancies search, but more endpoints will be added in the future.