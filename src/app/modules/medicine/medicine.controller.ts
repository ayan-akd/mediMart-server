import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MedicineService } from "./medicine.service";

const createMedicine = catchAsync(async (req: Request, res: Response) => {
  const data = await MedicineService.createMedicineToDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Medicine created successfully",
    data,
  });
});

const getAllMedicine = catchAsync(async (req: Request, res: Response) => {
  const data = await MedicineService.getAllMedicineFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Medicine retrieved successfully",
    data,
  });
});

const getSingleMedicine = catchAsync(async (req: Request, res: Response) => {
  const data = await MedicineService.getSingleMedicineFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Medicine retrieved successfully",
    data,
  });
});

const updateMedicine = catchAsync(async (req: Request, res: Response) => {
  const data = await MedicineService.updateMedicineToDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Medicine updated successfully",
    data,
  });
});

const deleteMedicine = catchAsync(async (req: Request, res: Response) => {
  const data = await MedicineService.deleteMedicineFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Medicine deleted successfully",
    data,
  });
});


export const MedicineController = { getAllMedicine, getSingleMedicine, createMedicine, updateMedicine, deleteMedicine };