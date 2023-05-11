import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogProps } from '@mui/material';

interface TcDialogProps extends DialogProps {
  children: ReactNode;
  toggleDialog: (openState: boolean) => void;
}

function TcDialog({ children, toggleDialog, ...props }: TcDialogProps) {
  return (
    <Dialog onClose={toggleDialog} {...props}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default TcDialog;
