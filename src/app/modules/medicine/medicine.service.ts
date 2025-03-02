import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { medicineSearchableFields } from './medicine.constant';
import MedicineModel from './medicine.model';
import { TMedicine } from './medicine.interface';

const createMedicineToDB = async (payload: TMedicine) => {
  const result = await MedicineModel.create(payload);
  return result;
};
const getAllMedicineFromDB = async (query: Record<string, unknown>) => {
  const medicineQuery = new QueryBuilder(MedicineModel.find({isDeleted:false}), query)
    .search(medicineSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await medicineQuery.modelQuery;
  const meta = await medicineQuery.countTotal();
  return {
    meta,
    data,
  };
};

const getSingleMedicineFromDB = async (id: string) => {
  const existingMedicine = await MedicineModel.isMedicineExists(id);
  if (!existingMedicine) {
    throw new AppError(httpStatus.NOT_FOUND, 'Medicine does not exist');
  }
  const result = await MedicineModel.findOne({ _id: id, isDeleted: false });
  return result;
};

const updateMedicineToDB = async (id: string, payload: Partial<TMedicine>) => {
  const existingMedicine = await MedicineModel.isMedicineExists(id);
  if (!existingMedicine) {
    throw new AppError(httpStatus.NOT_FOUND, 'Medicine does not exist');
  }
  const result = await MedicineModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteMedicineFromDB = async (id: string) => {
  const existingMedicine = await MedicineModel.isMedicineExists(id);
  if (!existingMedicine) {
    throw new AppError(httpStatus.NOT_FOUND, 'Medicine does not exist');
  }
  const result = await MedicineModel.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const MedicineService = {
  getAllMedicineFromDB,
  createMedicineToDB,
  getSingleMedicineFromDB,
  updateMedicineToDB,
  deleteMedicineFromDB,
};
