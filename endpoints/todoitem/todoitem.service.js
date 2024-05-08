const connection = require("../../connect");
const HttpStatusCode = require("../../common/statuscode");

module.exports = {
  getAll: getAll,
  getById: getById,
  insert: insert,
  update: update,
  deleteRole: deleteRole,
};

async function getAll() {
  const [rows] = await connection.query(
    "select id,item_name,is_completed,due_date from to_do_list_item order by is_completed"
  );
  if (!rows || !rows.length) {
    return {
      message: HttpStatusCode.NotFound.Message,
      status: HttpStatusCode.NotFound.Code,
    };
  }
  return {
    data: rows,
    status: HttpStatusCode.Success.Code,
  };
}

async function getById(id) {
  if (!id) {
    return {
      message: HttpStatusCode.BadRequest.Message,
      status: HttpStatusCode.BadRequest.Code,
    };
  }
  const [rows] = await connection.query(
    "select id,item_name,is_completed,due_date from to_do_list_item where id=?",
    [id]
  );
  return {
    data: rows[0],
    status: HttpStatusCode.Success.Code,
  };
}

async function insert(bodyObject) {
  let errors = await checkBodyValid(bodyObject, false);
  if (errors.length > 0) {
    return {
      message: HttpStatusCode.BadRequest.Message,
      status: HttpStatusCode.BadRequest.Code,
      errors: errors,
    };
  }

  const [response] = await connection.query(
    "Insert into to_do_list_item (item_name,due_date) values (?,?)",
    [
      bodyObject.item_name,
      bodyObject.due_date
    ]
  );
  return {
    message:
      response.affectedRows == 1
        ? HttpStatusCode.Created.Message
        : HttpStatusCode.InternalServerError.Message,
    data:
      response.affectedRows == 1
        ? (await getById(response.insertId)).data
        : null,
    status:
      response.affectedRows == 1
        ? HttpStatusCode.Created.Code
        : HttpStatusCode.InternalServerError.Code,
  };
}

async function update(bodyObject) {
  let errors = await checkBodyValid(bodyObject, true);
  if (errors.length > 0) {
    return {
      message: HttpStatusCode.BadRequest.Message,
      status: HttpStatusCode.BadRequest.Code,
      errors: errors,
    };
  }

  const [response] = await connection.query(
    "Update to_do_list_item set item_name=?, is_completed=?, due_date=? where Id=?",
    [
      bodyObject.item_name,
      bodyObject.is_completed,
      bodyObject.due_date,
      bodyObject.id,
    ]
  );
  return {
    message:
      response.affectedRows == 1
        ? HttpStatusCode.Success.Message
        : HttpStatusCode.NotFound.Message,
    data:
      response.affectedRows == 1
        ? (await getById(response.insertId)).data
        : null,
    status:
      response.affectedRows == 1
        ? HttpStatusCode.Success.Code
        : HttpStatusCode.NotFound.Code,
  };
}

async function deleteRole(id) {
      const [response] = await connection.query(
        "delete from to_do_list_item where id=?",
        [id]
      );
      return {
        message:
          response.affectedRows == 1
            ? HttpStatusCode.Success.Message
            : HttpStatusCode.NotFound.Message,
        data:
          response.affectedRows == 1
            ? (await getById(response.insertId)).data
            : null,
        status:
          response.affectedRows == 1
            ? HttpStatusCode.Success.Code
            : HttpStatusCode.NotFound.Code,
      };
}

async function checkBodyValid(bodyObject, forUpdate) {
  let errors = [];
  if (!bodyObject.item_name) {
    errors.push("To do item name is required");
  }
  if (bodyObject.item_name.length > 8000) {
    errors.push("To do item name exceeds 8000 characters");
  }
  if (forUpdate && !bodyObject.id) {
    errors.push("Id is required");
  }
  if (forUpdate && bodyObject.id && !/^[0-9]*$/.test(bodyObject.id)) {
    errors.push("Id accepts only numeric characters");
  }
  return errors;
}
