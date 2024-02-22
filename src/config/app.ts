const environment = process.env.NODE_ENV || "development";

let tokenExpirationTime: string;
if (environment === "production") {
   tokenExpirationTime = "1h";
} else {
   tokenExpirationTime = "10h";
}

export const AppConfig = Object.freeze({
   TOKEN_EXPIRATION_TIME: tokenExpirationTime,
   ITEMS_PER_PAGE: 10,
   MAX_ITEMS_PER_PAGE: 100,
});
