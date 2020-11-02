import supertest from "supertest";
import app from "../app";
//const jwt = require("jsonwebtoken");

const req = supertest(app);
describe("Test for api endpoint", () => {
  it("test fo get all staff Request", (done) => {
    const body = { email: "iwuji.anthony@decagon.dev", password: "99999999" };
    return req
      .post("/apiv1/login")
      .send(body)
      .expect(200)
      .end((err: any, res: any) => {
        console.log(res);
        if (err) done(err);
        expect(res.headers).toHaveProperty("set-cookie");
        done();
      });
  });

  // it('should update a staff', async () => {
  //   const res = await req
  //     .put('/')
  //     .send({

  //     });

  //   expect(res.status).toEqual(200);
  // });

  // it('should create a new staff', async () => {
  //   const result = await req
  //     .post('/')
  //     .send({
  //
  //     })
  //   expect(result.status).toEqual(200)
  //   //expect(result.body).toHaveProperty("oraganization")
  // })

  // it('should delete a staff', async () => {
  //   const res = await req.delete('/users/5f58a0d8ead2190c76faca8d');
  //   expect(res.status).toEqual(200);
  // });
});
