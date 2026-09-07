import { Router } from "express";
import { User } from "../../models/user.model.js";

export const router = Router();

// Read users
router.get("/", async (req, res, next) => {
  try {
    // 1.Get user data from database
    const users = await User.find();

    // 2.Send response object back to client
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// Create user
router.post("/", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = await User.create({ username, email, password });

    const { password: _password, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
});

// Create user with stack
// router.post("/", async (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newUser = await User.create({ username, email, password });

//     const { password: _password, ...userWithoutPassword } = newUser.toObject();

//     return res.status(201).json(userWithoutPassword);
//   } catch (err) {
//     next(err);
//   }
// });

// Update users
router.put("/:id", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

// Delete user
router.delete("/:id", async (req, res, next) => {
  try {
    // ตั้งตัวแปร เพื่อดึงเลือกข้อมูลจากDBมาแล้วลบ
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      return res.status(404).json({ error: "User not found!" });
    }
    // คืนค่าตัวแปร
    return res.status(200).json(deleteUser);
  } catch (err) {
    next(err);
  }
});
// Delete all user
router.delete("/", async (req, res, next) => {
  try {
    // ตั้งตัวแปร เพื่อลบข้อมูลจากDBทั้งหมด
    const deleteAllUser = await User.deleteMany();

    // if (!deleteAllUser) {
    //   return res.status(404).json({ error: "User not found!" });
    // }

    // คืนค่าตัวแปร
    return res.status(200).json(deleteAllUser);
  } catch (err) {
    next(err);
  }
});
