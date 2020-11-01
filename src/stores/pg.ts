import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();
export const sql = postgres(
  	'postgres://deqhvskx:SvzignKZBh0q1jz-vVBcwpHh5_sFmkRq@kandula.db.elephantsql.com:5432/deqhvskx'
);
