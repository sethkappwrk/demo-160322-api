import express from "express";

import Contact from "../models/contact";
import { success, error } from "../response-format";
import { SUCCESS, ERROR } from "../messages";

const router = express.Router();

router.get("/all", async (req, res) => {
  const { page = 1, limit = 10, isDeleted = false } = req.query;
  const searchQuery = req.query.search
    ? { name: { $regex: req.query.search, $options: "i" } }
    : {};
  const query = [
    {
      ...searchQuery,
      isDeleted,
    },
  ];
  const options = {
    page,
    limit,
    select: "name email country isActive updatedAt",
    sort: "-updatedAt",
  };
  try {
    const contacts = await Contact.paginate(...query, options);
    return res.status(200).json(success(SUCCESS.OK, contacts, res.statusCode));
  } catch (error) {
    return res.status(400).json(error(ERROR.BAD_REQUEST, res.statusCode));
  }
});

router.get("/:id", (req, res) => {
  Contact.findById(req.params.id, (err, contact) => {
    if (err || !contact)
      return res.status(400).json(error(ERROR.BAD_REQUEST, res.statusCode));
    return res
      .status(200)
      .json(success(SUCCESS.OK, { contact }, res.statusCode));
  });
});

router.post("/", async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
    isActive: req.body.isActive,
  });
  await contact.save((err) => {
    if (err) {
      return res.status(400).json(error(err));
    }
    return res
      .status(201)
      .json(success(SUCCESS.CONTACT_CREATED, { contact }, res.statusCode));
  });
});

router.put("/:id", (req, res) => {
  Contact.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    (err, contact) => {
      if (err) return res.status(400).json(error(err, res.statusCode));
      if (!contact) {
        return res.status(400).json(error(ERROR.BAD_REQUEST, res.statusCode));
      }
      return res
        .status(200)
        .json(success(SUCCESS.CONTACT_UPDATED, { contact }, res.statusCode));
    }
  );
});

router.delete("/:id", (req, res) => {
  Contact.findByIdAndRemove(req.params.id, (err) => {
    if (err)
      return res.status(400).json(error(ERROR.BAD_REQUEST, res.statusCode));
    res
      .status(200)
      .json(success(SUCCESS.OK, SUCCESS.CONTACT_DELETED, res.statusCode));
  });
});

export default router;
