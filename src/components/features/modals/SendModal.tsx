import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { toggleSendModal } from "../../../store/financeSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";

const SendModal = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.finance.sendModalOpen);

  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      bank: "",
      amount: "",
      description: "",
      category: "",
    },
    validationSchema: Yup.object({
      accountNumber: Yup.string()
        .matches(/^\d+$/, "Account number must be numeric")
        .max(10, "Account number must be at most 10 digits")
        .required("Account number is required"),
      bank: Yup.string().required("Bank is required"),
      amount: Yup.number()
        .positive("Amount must be positive")
        .required("Amount is required"),
      description: Yup.string().max(150, "Description must be at most 150 characters"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: (values) => {
      toast.success(`Funds sent successfully!`, {
        description: `You have sent ${values.amount} to ${values.accountNumber} at ${values.bank}.`,
        duration: 2000,
      });
      formik.resetForm();
      dispatch(toggleSendModal());
    },
  });

  const banks = [
    "FinPal Bank",
    "First Bank",
    "Access Bank",
    "GTBank",
    "Zenith Bank",
    "UBA",
    "Union Bank",
  ];

  return (
    <Dialog open={open} onOpenChange={() => dispatch(toggleSendModal())}>
      <DialogContent>
        <DialogHeader>
          <h3 className="text-xl ">Send Funds</h3>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Account Number */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              name="accountNumber"
              placeholder="1234567890"
              maxLength={10} // Limit input to 10 characters
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.accountNumber && formik.errors.accountNumber
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.accountNumber && formik.errors.accountNumber && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.accountNumber}
              </p>
            )}
          </div>

          {/* Bank */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="bank">Bank</Label>
            <Select
              value={formik.values.bank}
              onValueChange={(value) => formik.setFieldValue("bank", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a bank" />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank) => (
                  <SelectItem key={bank} value={bank}>
                    {bank}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.bank && formik.errors.bank && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.bank}</p>
            )}
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="1000"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.amount && formik.errors.amount
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.amount && formik.errors.amount && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formik.values.category}
              onValueChange={(value) => formik.setFieldValue("category", value)}
               className="w-full"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.category}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Optional note or reason"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-5">
            Send Funds
          </Button>
        </form>
      </DialogContent>
      <Toaster position="top-right" richColors />
    </Dialog>
  );
};

export default SendModal;