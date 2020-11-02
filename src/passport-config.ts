import { getAdmin, getCompanyByEmail } from "./controller/queries";
import { getStaffByEmail, getStaffById } from "./controller/queries";
import bcrypt from "bcrypt";

import { Strategy as LocalStrategy } from "passport-local";
function initialize(passport: any) {
  const authenticateUser = async (
    email: string,
    password: string,
    done: any,
  ) => {
    const company: any = await getCompanyByEmail(email);
    const staff: any = await getStaffByEmail(email);
    const admin: any = await getAdmin(email);
    const usersArray = [company, staff, admin];
    const user = usersArray.find((user) => {
      if (user !== undefined && user !== -1) {
        return user;
      }
      return null;
    });

    console.log("the user", user);
    if (user === null) {
      console.log("No such User");
      return done(null, false, { maessage: "No user with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.password!)) {
        console.log("correct password");
        return done(null, user);
      } else {
        console.log("Incorrect password");
        return done(null, false, { maessage: "password incorrect" });
      }
    } catch (error) {
      return done(error);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user: any, done: any) => done(null, user.user_id));
  passport.deserializeUser((id: any, done: (arg0: any) => any) => {
    return done(getStaffById(id));
  });
}

export default initialize;
