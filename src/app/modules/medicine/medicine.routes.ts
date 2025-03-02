import { Router } from 'express';
import { MedicineController } from './medicine.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

// Define routes
router.get('/medicine', MedicineController.getAllMedicine);

router.get('/medicine/:id', MedicineController.getSingleMedicine);

router.post(
  '/medicine',
  auth(USER_ROLE.admin),
  MedicineController.createMedicine,
);

router.patch(
  '/medicine/:id',
  auth(USER_ROLE.admin),
  MedicineController.updateMedicine,
);

router.patch(
  '/medicine/:id',
  auth(USER_ROLE.admin),
  MedicineController.deleteMedicine,
);

export const MedicineRoutes = router;
