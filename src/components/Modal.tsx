'use client';

import { FiAlertOctagon } from 'react-icons/fi';

type ModalProps = {
  modalText?: string;
  textIcon?: any;
  modalTitle?: string;
  modalDesc?: string;
  className?: string;
  action: () => Promise<void> | Promise<ToastInfoProp>;
};

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { IoClose } from 'react-icons/io5';

export default function Modal(props: ModalProps) {
  const { modalText,textIcon, modalTitle, modalDesc, className, action } = props;

  return (
    <AlertDialog>
      <AlertDialogTrigger className={className}>
        {textIcon && textIcon}
        {modalText}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className='flex items-center justify-between mb-4'>
            <span className='text-sm text-zinc-400 flex-center gap-x-2'>
              <FiAlertOctagon className='text-lg' /> Attention
            </span>

            <AlertDialogCancel className='w-fit h-fit bg-zinc-800 text-zinc-400 p-2 rounded transition-all hover:bg-zinc-800/80'>
              <IoClose />
            </AlertDialogCancel>
          </div>

          <AlertDialogTitle>{modalTitle}</AlertDialogTitle>
          {modalDesc && <AlertDialogDescription>{modalDesc}</AlertDialogDescription>}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={action}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
