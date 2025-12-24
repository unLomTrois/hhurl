import { HHURL } from "./hh_url";
import { test, expect, it, describe } from "bun:test";

describe("hhurl", () => {
  describe("vacancies()", () => {
    it("returns valid url", () => {
      const url = new HHURL()
        .vacancies()
        .text("javascript")
        .area("1")
        .per_page(100)
        .clusters(true)
        .toString();

      expect(url).toBe(
        "https://api.hh.ru/vacancies?text=javascript&area=1&per_page=100&clusters=true"
      );
    });

    describe("clusters()", () => {
      const hh = new HHURL();

      it("accepts booleans", () => {
        expect(hh.vacancies().clusters(true).toJSON()).toBe(
          "https://api.hh.ru/vacancies?clusters=true"
        );
        expect(hh.vacancies().clusters(false).toJSON()).toBe(
          "https://api.hh.ru/vacancies"
        );
      });
    });

    describe("page()", () => {
      const hh = new HHURL();

      expect(hh.vacancies().page(20).toJSON()).toBe(
        "https://api.hh.ru/vacancies?page=20"
      );

      it("does not accept floats", () => {
        expect(() => hh.vacancies().page(1.5)).toThrow();
      });

      it("does not accept negatives", () => {
        expect(() => hh.vacancies().page(-100)).toThrow();
      });

      it("throws if page*per_page is more than 2000", () => {
        const hh = new HHURL();
        expect(() => hh.vacancies().per_page(100).page(20)).toThrow();
      });
    });

    describe("per_page()", () => {
      const hh = new HHURL();

      expect(hh.vacancies().per_page(100).toJSON()).toBe(
        "https://api.hh.ru/vacancies?per_page=100"
      );

      it("does not accept floats", () => {
        expect(() => hh.vacancies().per_page(1.5)).toThrow();
      });

      it("does not accept negatives", () => {
        expect(() => hh.vacancies().per_page(-100)).toThrow();
      });

      it("throws if page*per_page is more than 2000", () => {
        const hh = new HHURL();
        expect(() => hh.vacancies().page(20).per_page(100)).toThrow();
      });
    });

    describe("date_from()", () => {
      const hh = new HHURL();
      const date = new Date(Date.UTC(2025, 0, 1));

      it("accepts date", () => {
        expect(hh.vacancies().date_from(date).toJSON()).toBe(
          "https://api.hh.ru/vacancies?date_from=2025-01-01"
        );
      });

      it("accepts null", () => {
        expect(hh.vacancies().date_from(null).toJSON()).toBe(
          "https://api.hh.ru/vacancies"
        );
      });
    });

    describe("date_to()", () => {
      const hh = new HHURL();
      const date = new Date(Date.UTC(2025, 0, 1));

      it("accepts date", () => {
        expect(hh.vacancies().date_to(date).toJSON()).toBe(
          "https://api.hh.ru/vacancies?date_to=2025-01-01"
        );
      });

      it("accepts null", () => {
        expect(hh.vacancies().date_to(null).toJSON()).toBe(
          "https://api.hh.ru/vacancies"
        );
      });
    });
  });
});
