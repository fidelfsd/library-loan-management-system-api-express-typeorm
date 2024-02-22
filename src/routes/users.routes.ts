import express from "express";
import { auth } from "../middlewares/auth";
import { userController } from "../controllers/userController";
import { authorize } from "../middlewares/authorize";

// -----------------------------------------------------------------------------

const router = express.Router();
const ctrl = userController;

// User routes
// -----------------------------------------------------------------------------
router.get("/profile", auth, ctrl.getProfile);
router.put("/profile", auth, ctrl.updateProfile);

router.get("/loans", auth, ctrl.getUserLoans);

router.get("/favorite-books", auth, ctrl.getFavoriteBooks);
router.post("/favorite-books", auth, ctrl.addFavoriteBooks);
router.delete("/favorite-books/:bookId", auth, ctrl.deleteBookFromFavorite);

// Protected routes
// -----------------------------------------------------------------------------

router.post("/", auth, authorize(["admin"]), ctrl.create);
router.get("/", auth, authorize(["admin"]), ctrl.getAll);
router.get("/:id", auth, authorize(["admin"]), ctrl.getById);
router.put("/:id", auth, authorize(["admin"]), ctrl.update);
router.delete("/:id", auth, authorize(["admin"]), ctrl.delete);
router.get("/:id/loans", auth, authorize(["manager"]), ctrl.geLoansByUserId);
router.put("/:id/role", auth, authorize(["admin"]), ctrl.updateRoleByUserId);

export default router;
