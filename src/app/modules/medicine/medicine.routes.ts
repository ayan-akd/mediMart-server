import { Router } from 'express';
import { MedicineController } from './medicine.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { MedicineValidation } from './medicine.validation';

const router = Router();

// Define routes
router.get('/medicine', MedicineController.getAllMedicine);

router.get('/medicine/:id', MedicineController.getSingleMedicine);

router.post(
  '/medicine',
  auth(USER_ROLE.admin),
  validateRequest(MedicineValidation.createMedicineValidation),
  MedicineController.createMedicine,
);

router.patch(
  '/medicine/:id',
  auth(USER_ROLE.admin),
  MedicineController.updateMedicine,
);

router.delete(
  '/medicine/:id',
  auth(USER_ROLE.admin),
  MedicineController.deleteMedicine,
);

export const MedicineRoutes = router;
