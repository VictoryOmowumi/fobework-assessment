import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { toggleReceiveModal } from "../../../store/financeSlice";
import { FiCopy } from "react-icons/fi";
import { toast, Toaster } from "sonner";
const ReceiveModal = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.finance.receiveModalOpen);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        toast.success("Copied to clipboard", {
            description: `You have copied ${text}`,
            duration: 2000,
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={() => dispatch(toggleReceiveModal())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Receive Funds</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Share your virtual account number or use one of the top-up methods
            below.
          </div>
          <div className="space-y-2">
            {/* Account Number */}
            <div className="p-3 border rounded flex justify-between items-center">
              <span>
                Account Number: <strong>1234567890</strong>
              </span>
              <button
                onClick={() => handleCopy("1234567890")}
                className="text-primary hover:underline flex items-center gap-1"
              >
                <FiCopy className="w-4 h-4" />
              </button>
            </div>

            {/* Bank Name */}
            <div className="p-3 border rounded flex justify-between items-center">
              <span>
                Bank: <strong>FinPal Bank</strong>
              </span>
              <button
                onClick={() => handleCopy("FinPal Bank")}
                className="text-primary hover:underline flex items-center gap-1"
              >
                <FiCopy className="w-4 h-4" />
              </button>
            </div>

            {/* USSD Code */}
            <div className="p-3 border rounded flex justify-between items-center">
              <span>
                USSD: <strong>*123*000#</strong>
              </span>
              <button
                onClick={() => handleCopy("*123*000#")}
                className="text-primary hover:underline flex items-center gap-1"
              >
                <FiCopy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
        <Toaster position="top-right" richColors closeButton={false} />
    </Dialog>
  );
};

export default ReceiveModal;