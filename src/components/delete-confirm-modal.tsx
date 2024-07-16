import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingBars } from "@/components/ui/loading-bars";
export const DeleteConfirmModal = ({
  open,
  setOpen,
  title,
  description,
  loading,
  onDelete,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description?: string;
  loading: boolean;
  onDelete: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        <div className="flex flex-col gap-4 sm:flex-row-reverse">
          <Button variant="destructive" onClick={onDelete} disabled={loading}>
            {loading ? <LoadingBars /> : <span>ยืนยัน</span>}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            ยกเลิก
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
