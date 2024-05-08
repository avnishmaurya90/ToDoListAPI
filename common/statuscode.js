const HttpStatusCode = {
  NotFound: { Code: 404, Message: "Not Found" },
  BadRequest: { Code: 400, Message: "Bad Request" },
  InternalServerError: { Code: 500, Message: "Internal Server Error" },
  Success: { Code: 200, Message: "Success" },
  Created: { Code: 201, Message: "Created" },
  NotAllowed: { Code: 405 , Message: "Not Allowed" },
};
module.exports = HttpStatusCode;
