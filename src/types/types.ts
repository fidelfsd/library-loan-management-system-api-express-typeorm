export type UrlParams = {
   page?: string; // Current page number
   limit?: string; // Number of items per page
};

export type ParsedUrlParams = {
   page: number; // Current page number
   limit: number; // Number of items per page
};

export type GetAllOptions = {
   page?: number; // Current page number
   limit?: number; // Number of items per page
};

export type TokenData = {
   userId: number;
   userRole: string;
};
