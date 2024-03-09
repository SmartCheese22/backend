import { Router } from "express";
import { loginCollegeSearching, registerCollegeSearching, logoutCollegeSearching } from "../controllers/collegeSearching.controller.js";
import { registerCollegeGoing, loginCollegeGoing, logoutCollegeGoing } from "../controllers/collegeGoing.controller.js";
import { loginAdmin, logoutAdmin } from "../controllers/admin.controller.js";
import { verifyJWT_CG } from "../middlewares/authCG.middleware.js";
import { verifyJWT_CS } from "../middlewares/authCS.middleware.js";

const router = Router()

router.route("/registerCollegeGoing").post(registerCollegeGoing)
router.route("/registerCollegeSearching").post(registerCollegeSearching)

router.route("/loginCollegeGoing").post(loginCollegeGoing)
router.route("/loginCollegeSearching").post(loginCollegeSearching)
router.route("/loginAdmin").post(loginAdmin)
router.route("/logoutAdmin").post(logoutAdmin)

//secure routes

router.route("/logoutCollegeGoing").post(verifyJWT_CG, logoutCollegeGoing)
router.route("/logoutCollegeSearching").post(verifyJWT_CS, logoutCollegeSearching)
export default router