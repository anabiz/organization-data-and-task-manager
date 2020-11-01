export const companyVerifyEmailBody = (
  token: string,
) => `<h3>Please, click on the link bellow to verify your company email</h3>
                                             <P><a href='http://localhost:3000/apiv1/company/verifycompanyemail/${token}' rel='noopener noreferrer'>click here to verify your email</a> </P> `;
