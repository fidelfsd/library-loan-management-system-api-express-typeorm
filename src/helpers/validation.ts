import { AppConfig } from "../config/app";
import { ParsedUrlParams, UrlParams } from "../types/types";

// -----------------------------------------------------------------------------

const defaultLimit = AppConfig.ITEMS_PER_PAGE;
const maxLimit = AppConfig.MAX_ITEMS_PER_PAGE;

export const parseUrlParams = (params: UrlParams = {}): ParsedUrlParams => {
   const { page = 1, limit = defaultLimit } = params;

   const parsedPage = Math.max(Math.abs(+page) || 1, 1);
   const parsedLimit = Math.min(Math.max(+limit || defaultLimit, 1), maxLimit);

   return {
      page: parsedPage,
      limit: parsedLimit,
   };
};
