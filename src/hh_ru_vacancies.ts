import { BASE_HH_URL } from "./hh_url";

// Vacancies URL builder - implements all vacancy search parameters

const DEFAULT_PAGE = 0;
const DEFAULT_PER_PAGE = 10;

/**
 * @todo maybe add a `validate()` method to enable validations, or otherwise disable validations `validate(false)`
 */
export class HHURLVacancies extends URL {
  constructor(url?: string | URL) {
    if (!url) {
      super(BASE_HH_URL);
    } else {
      super(url);
    }
    this.pathname = "/vacancies";
  }

  // Pagination

  /**
   * Calculates so-called "pagination depth", according HH API you cannot paginate further than 2000 vacancies from a single url,
   * @param page - if not provided, is inferred from searchParams or defaults to 0
   * @param per_page if not provided, is inferred from searchParams or defaults to 10
   * @returns `page * per_page` or `per_page` if `page` = 0 
   */
  pagination_depth({
    page,
    per_page,
  }: {
    page?: number;
    per_page?: number;
  }): number {
    if (!page) {
      page = this.searchParams.has("page")
        ? Number.parseInt(this.searchParams.get("page")!)
        : DEFAULT_PAGE;
    }
    if (!per_page) {
      per_page = this.searchParams.has("per_page")
        ? Number.parseInt(this.searchParams.get("per_page")!)
        : DEFAULT_PER_PAGE;
    }
    return page === 0 ? per_page : page * per_page;
  }

  page(page: number): HHURLVacancies {
    if (!Number.isInteger(page)) {
      throw new TypeError("page expects an integer number");
    }
    if (page < 0) {
      throw new TypeError("page expects a positive value");
    }
    if (this.pagination_depth({ page }) >= 2000) {
      throw new Error("pagination depth cannot be >= 2000");
    }
    this.searchParams.set("page", page.toString());
    return this;
  }

  per_page(per_page: number): HHURLVacancies {
    if (!Number.isInteger(per_page)) {
      throw new TypeError("per_page expects an integer number");
    }
    if (per_page < 0) {
      throw new Error("per_page expects a positive value");
    }
    if (per_page > 100) {
      throw new Error("per_page must be <= 100");
    }
    if (this.pagination_depth({ per_page }) >= 2000) {
      throw new Error("pagination depth cannot be >= 2000");
    }
    this.searchParams.set("per_page", per_page.toString());
    return this;
  }

  // Search
  text(value: string): HHURLVacancies {
    this.searchParams.set("text", value);
    return this;
  }

  search_field(value: string): HHURLVacancies {
    this.searchParams.set("search_field", value);
    return this;
  }

  excluded_text(value: string): HHURLVacancies {
    this.searchParams.set("excluded_text", value);
    return this;
  }

  // Filters
  experience(value: string): HHURLVacancies {
    this.searchParams.set("experience", value);
    return this;
  }

  /** @deprecated */
  employment(value: string): HHURLVacancies {
    this.searchParams.set("employment", value);
    return this;
  }

  /** @deprecated */
  schedule(value: string): HHURLVacancies {
    this.searchParams.set("schedule", value);
    return this;
  }

  area(value: string): HHURLVacancies {
    this.searchParams.set("area", value);
    return this;
  }

  metro(value: string): HHURLVacancies {
    this.searchParams.set("metro", value);
    return this;
  }

  professional_role(value: string): HHURLVacancies {
    this.searchParams.set("professional_role", value);
    return this;
  }

  industry(value: string): HHURLVacancies {
    this.searchParams.set("industry", value);
    return this;
  }

  employer_id(value: string): HHURLVacancies {
    this.searchParams.set("employer_id", value);
    return this;
  }

  label(value: string): HHURLVacancies {
    this.searchParams.set("label", value);
    return this;
  }

  education(value: string): HHURLVacancies {
    this.searchParams.set("education", value);
    return this;
  }

  driver_license_types(value: string): HHURLVacancies {
    this.searchParams.set("driver_license_types", value);
    return this;
  }

  // Salary
  currency(value: string): HHURLVacancies {
    this.searchParams.set("currency", value);
    return this;
  }

  salary(value: number): HHURLVacancies {
    this.searchParams.set("salary", value.toString());
    return this;
  }

  only_with_salary(value: boolean): HHURLVacancies {
    this.searchParams.set("only_with_salary", value.toString());
    return this;
  }

  // Date range
  period(value: number): HHURLVacancies {
    this.searchParams.set("period", value.toString());
    return this;
  }

  date_from(date: Date | null): HHURLVacancies {
    if (date === null) {
      this.searchParams.delete("date_from");
      return this;
    }
    this.searchParams.set("date_from", date.toISOString().split("T")[0]!);
    return this;
  }

  date_to(date: Date | null): HHURLVacancies {
    if (date === null) {
      this.searchParams.delete("date_to");
      return this;
    }
    this.searchParams.set("date_to", date.toISOString().split("T")[0]!);
    return this;
  }

  // Geo coordinates
  top_lat(value: number): HHURLVacancies {
    this.searchParams.set("top_lat", value.toString());
    return this;
  }

  bottom_lat(value: number): HHURLVacancies {
    this.searchParams.set("bottom_lat", value.toString());
    return this;
  }

  left_lng(value: number): HHURLVacancies {
    this.searchParams.set("left_lng", value.toString());
    return this;
  }

  right_lng(value: number): HHURLVacancies {
    this.searchParams.set("right_lng", value.toString());
    return this;
  }

  // Sorting
  order_by(value: string): HHURLVacancies {
    this.searchParams.set("order_by", value);
    return this;
  }

  sort_point_lat(value: number): HHURLVacancies {
    this.searchParams.set("sort_point_lat", value.toString());
    return this;
  }

  sort_point_lng(value: number): HHURLVacancies {
    this.searchParams.set("sort_point_lng", value.toString());
    return this;
  }

  // Response options
  clusters(value: boolean): HHURLVacancies {
    if (value) {
      this.searchParams.set("clusters", "true");
    } else {
      this.searchParams.delete("clusters");
    }
    return this;
  }

  describe_arguments(value: boolean): HHURLVacancies {
    this.searchParams.set("describe_arguments", value.toString());
    return this;
  }

  no_magic(value: boolean): HHURLVacancies {
    this.searchParams.set("no_magic", value.toString());
    return this;
  }

  premium(value: boolean): HHURLVacancies {
    this.searchParams.set("premium", value.toString());
    return this;
  }

  responses_count_enabled(value: boolean): HHURLVacancies {
    this.searchParams.set("responses_count_enabled", value.toString());
    return this;
  }

  // Work schedule / employment
  /** @deprecated */
  part_time(value: string): HHURLVacancies {
    this.searchParams.set("part_time", value);
    return this;
  }

  accept_temporary(value: boolean): HHURLVacancies {
    this.searchParams.set("accept_temporary", value.toString());
    return this;
  }

  employment_form(value: string): HHURLVacancies {
    this.searchParams.set("employment_form", value);
    return this;
  }

  work_schedule_by_days(value: string): HHURLVacancies {
    this.searchParams.set("work_schedule_by_days", value);
    return this;
  }

  working_hours(value: string): HHURLVacancies {
    this.searchParams.set("working_hours", value);
    return this;
  }

  work_format(value: string): HHURLVacancies {
    this.searchParams.set("work_format", value);
    return this;
  }

  // Locale
  hh_host(value: string): HHURLVacancies {
    this.searchParams.set("host", value);
    return this;
  }

  locale(value: string): HHURLVacancies {
    this.searchParams.set("locale", value);
    return this;
  }
}
