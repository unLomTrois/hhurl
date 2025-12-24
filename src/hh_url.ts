import { HHURLVacancies } from "./hh_vacancies";

export const BASE_HH_URL = new URL("https://api.hh.ru/");

/**
 * HHURL is a wrapper around URL API to construct urls to headhunter api using chaiable methods
 * @example ```typescript
 *  const hh = new HHURL()
 *  const vacancies = 
 *    hh
 *    .vacancies()
 *    .text("javascript")
 *    .area("1")
 *    .per_page(100)
 *    .clusters(true)
 *    .toString()
 * // https://api.hh.ru/vacancies?text=javascript&area=1&per_page=100&clusteres=true
 * ```  
 */
export class HHURL extends URL {
  constructor(url?: string | URL) {
    if (!url) {
      super(BASE_HH_URL);
      return;
    }
    super(url);
  }

  vacancies(): HHURLVacancies {
    return new HHURLVacancies(this);
  }
}


