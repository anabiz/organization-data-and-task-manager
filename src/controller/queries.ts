import { sql } from "../stores/pg";
import { companyType } from "../schema/types/company";
import { staffType } from "../schema/types/staff";
import { taskType } from "../schema/types/task";

export async function createStaff(data: staffType) {
  try {
    return sql`INSERT INTO staff ${sql(data)} RETURNING *`.then(
      ([data]) => data,
    );
  } catch (error) {
    return error.message;
  }
}

//delete a staff by id
export async function deleteStaffById(id: string) {
  try {
    return sql`DELETE FROM staff WHERE id = ${id}`.then(([data]) => data);
  } catch (error) {
    console.error(error);
    return -1;
  }
}

//take this update note of this function. Still has some outstanding issues
export async function updateStaffById(id: string, staffData: staffType) {
  try {
    return sql`UPDATE staff ${sql(staffData)} WHERE id = ${id}`.then(
      ([data]) => data,
    );
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function createCompany(data: companyType) {
  try {
    return sql`INSERT INTO company ${sql(data)} RETURNING *`.then(
      ([data]) => data,
    );
  } catch (error) {
    return error.message;
  }
}

//take this update note of this function. Still has some outstanding issues
export async function updateCompanyById(id: string, companyData: companyType) {
  try {
    return sql`UPDATE company ${sql(companyData)} WHERE id = ${id}`.then(
      ([data]) => data,
    );
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function getCompanyByEmail(email: string) {
  try {
    return sql`SELECT * FROM company WHERE email = ${email}`.then(
      ([data]) => data,
    );
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function getAllStaffByCompanyId(id: string) {
  try {
    return sql`SELECT * FROM staff WHERE company_id = ${id}`.then(
      ([data]) => data,
    );
  } catch (error) {
    console.error(error);
    return -1;
  }
}
export async function getStaffById(id: string) {
  try {
    return sql`SELECT * FROM staff WHERE id = ${id}`.then(([data]) => data);
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function getStaffByEmail(email: string) {
  try {
    return sql`SELECT * FROM staff WHERE email = ${email}`.then(
      ([data]) => data,
    );
  } catch (error) {
    console.error(error);
    return -1;
  }
}

// export async function updateResetPasswordToken(data: string, id: string) {
//   try {
//     return sql`UPDATE users SET reset_password_token = ${data} WHERE user_id = ${id}`.then(
//       (data) => data,
//     );
//   } catch (error) {
//     console.error(error);
//     return;
//   }
// }

export async function updateCompanyVerifyEmailToken(data: string, id: string) {
  try {
    return sql`UPDATE company SET email_verified_token = ${data} WHERE id = ${id}`.then(
      ([data]) => data,
    );
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function updateCompanyVerificationStatus(
  data: string,
  link: string,
) {
  try {
    return sql`UPDATE company SET email_verified = ${data} WHERE email_verified_token = ${link}`.then(
      ([data]) => data,
    );
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function getAdmin(email: string) {
  try {
    return sql`SELECT * FROM admin WHERE email = ${email}`.then(
      ([data]) => data,
    );
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function assignTaskById(task: taskType) {
  try {
    return sql`INSERT INTO task ${sql(task)} RETURNING *`.then(
      ([data]) => data,
    );
  } catch (error) {
    return error.message;
  }
}

export async function getTaskById(id: string) {
  try {
    return sql`SELECT * FROM task WHERE staff_id = ${id}`.then((data) => data);
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function getAllTaskByCompanyId(companyId: string) {
  try {
    return sql`SELECT * FROM task WHERE company_id = ${companyId}`.then(
      ([data]) => data,
    );
  } catch (error) {
    console.error(error);
    return -1;
  }
}
