// import { Response, Request, NextFunction } from "express";
// import { getStudentByUserId, getUserByEmail } from "../controller/queries";


// export const checkCeo = async (req: Request, res: Response, next: NextFunction) => {
//     const email = req.body.email;
    
//     try {
//         const user: any = await getUserByEmail(email);
//         const students: any = await getStudentByUserId(user.user_id);
//         const studentDetails = students.slice(0, students.count);
//         if(students.count > 1){
//             return res.status(200).json({registeredStudents: studentDetails})
//         }
//        next();
//     } catch (error) {
//         return res.status(500).json({ error });
//     }
//    return res.status(400);
// }