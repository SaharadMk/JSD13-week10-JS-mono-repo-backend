import { Router } from "express";
import { users } from "../../fakeDB/fakeUsers.js";

export const router = Router();

// Read users
router.get("/users", (req, res, next) => {
  try {


  } catch (err) {
    next(err)
  }
});

// Create user
router.post("/users", (req, res, next) => {

  try {


  } catch (err) {
    next(err)
  }
  });
  
  // Update users
router.put("/users/:id", (req, res, next) => {

    try {
    

} catch (err) {
  next(err)
}
});

// Delete userห
router.delete("/users/:id", (req, res, next) => {


  try {
    

  } catch (err) {
    next(err);
  }
});