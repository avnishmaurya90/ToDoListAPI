const express = require("express");
const router = express.Router();
const todoitemService = require("./todoitem.service");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", insert);
router.put("/", update);
router.delete("/:id", deleteRole);
module.exports = router;

async function getAll(req, res, next) {
  await todoitemService
    .getAll()
    .then((data) => res.status(data.status).json(data))
    .catch(next);
}

async function getById(req, res, next) {
  await todoitemService
    .getById(req.params.id)
    .then((data) => res.status(data.status).json(data))
    .catch(next);
}

async function insert(req, res, next) {
  await todoitemService
    .insert(req.body)
    .then((data) => res.status(data.status).json(data))
    .catch(next);
}

async function update(req, res, next) {
  await todoitemService
    .update(req.body)
    .then((data) => res.status(data.status).json(data))
    .catch(next);
}

async function deleteRole(req, res, next) {
  await todoitemService
    .deleteRole(req.params.id)
    .then((data) => res.status(data.status).json(data))
    .catch(next);
}
