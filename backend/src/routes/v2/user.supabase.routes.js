import { Router } from "express";
import { supabase } from "../../config/supabase.js";

export const router = Router();
const PG_SELECT = "id, username, email, role, created_at, updated_at";

// Read users
router.get("/pg", async (req, res, next) => {
  try {
    // หลักการออกแบบ Response ของ Supabaseทุกครั้งที่เราสั่งงาน Supabase (เช่น .select(), .insert(), .update(), .delete())
    // ตัวไลบรารีจะไม่ส่งข้อมูลดิบกลับมาตรงๆ แต่จะห่อหุ้มผลลัพธ์ทั้งหมดให้อยู่ในรูปของ JavaScript Object ที่มีหน้าตาแบบนี้เสมอ:
    // {
    //   data: [ ... ],   /ข้อมูลที่เราขอ (เช่น รายชื่อผู้ใช้) หรือ null ถ้าเกิดข้อผิดพลาด
    //   error: null       ข้อมูลความผิดพลาด หรือ null ถ้าคำสั่งทำงานสำเร็จ
    // }

    // * **Mongoose (MongoDB):**
    // ฟังก์ชันอย่าง `findByIdAndDelete` จะคืนค่าผลลัพธ์กลับมาเป็น **ค่าเดี่ยว (Single Value)** ตรงๆ เลย
    // คือถ้าหาเจอจะได้ตัวเอกสาร (Document) ของข้อมูลนั้นกลับมาตรงๆ แต่ถ้าหาไม่เจอจะได้ค่าเป็น `null`
    // ส่วนเรื่องการจัดการข้อผิดพลาด (Error) Mongoose จะเลือกใช้วิธีโยนเข้าบล็อก `try...catch` อัตโนมัติ (หรือสั่ง `.catch()`)
    // แทนที่จะส่งตัวแปร error กลับมาใน Object ผลลัพธ์
    // * **Supabase (PostgreSQL):**
    // ถูกออกแบบมาให้คืนค่าผลลัพธ์เป็นมาตรฐานเดียวกันทุกคำสั่งในรูปแบบ **Object คู่หู `{ data, error }**` เสมอ
    // เพื่อให้ผู้พัฒนาสามารถเช็คได้ทันทีว่าคำสั่งสำเร็จหรือไม่โดยไม่ต้องผ่าน `try...catch` ทุกครั้ง
    // ทำให้เราจำเป็นต้องดึงค่าออกมาด้วย Destructuring (`const { data, error } = ...`) ทุกครั้งครับ

    const { data, error } = await supabase.from("users").select(); //Error ใน 9 มันเป็น destruct ของที่ได้จาก return query ครับ
    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// Create user
router.post("/pg", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ username, email, password }])
      .select();
    if (error) throw error;
    return res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

// Create user with stack
// ลองนำแนวคิดการเตรียม Array ของข้อมูลผ่าน for loop แล้วส่งเข้า User.insertMany() ไปลองร่างโค้ดดูก่อนครับ ติดตรงไหนเอามาแชร์ให้ช่วยดูทีละสเต็ปได้เลย
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

router.put("/pg/:id", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

// Delete user
router.delete("/pg/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", id);

    if (error) throw error;
    res.status(201).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
});
// Delete all user
router.delete("/pg", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});
