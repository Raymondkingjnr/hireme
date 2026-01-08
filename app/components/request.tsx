import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomInput } from "./custom-input";
import { CustomBtn } from "./custom-btn";

export function Review() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className=" bg-green-lightbgGreen h-[34px] font-semibold px-3 rounded-full hover:opacity-60">
            Send a Request
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px] mx-auto">
          <DialogHeader>
            <DialogTitle>Ask for a request</DialogTitle>
            <DialogDescription>tell us how we can be of help</DialogDescription>
          </DialogHeader>
          <div className=" flex flex-col gap-6">
            <div>
              <CustomInput
                placeholder="Enter email"
                label="Email"
                className=" w-full focus:ring-0"
              />
            </div>
            <div>
              <p className=" py-3 font-semibold">Request</p>
              <textarea
                placeholder="request"
                className=" w-full h-[160px] border px-3 py-2 border-gray-gray50 rounded-lg bg-transparent 
    outline-none
    focus:outline-none
    focus:ring-0"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <CustomBtn
                title="Cancle"
                className="bg-green-lightbgGreen text-green-darkbggreen font-semibold"
              />
            </DialogClose>
            <CustomBtn
              title="Send"
              className="bg-green-darkbggreen text-green-lightbgGreen font-semibold"
            />
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
