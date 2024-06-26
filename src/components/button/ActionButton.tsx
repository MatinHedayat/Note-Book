'use client';

import { deleteAccountToastInfo, logoutToastInfo } from '@/data/toastInfo';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Modal from '../Modal';

type ActionButtonProps = {
  text: string;
  className?: string;
  action: () => any;
  actionType?: string;
} & ModalTypes;

type ModalTypes =
  | { modal: true; modalTitle: string; modalDesc?: string }
  | { modal?: false; modalTitle?: never; modalDesc?: never };

export default function ActionButton(props: ActionButtonProps) {
  const { toast } = useToast();
  const { text, className, action, actionType, modal, modalTitle, modalDesc } = props;

  async function handleClick() {
    const response = await action();
    if (response) {
      toast({
        title: response.message,
        description: response.desc,
        variant: 'destructive',
      });
      return;
    }

    if (!actionType) return;
    const toastInfo = toastInfoMaker(actionType);
    toast({ title: toastInfo?.message, description: toastInfo?.desc });
  }

  return (
    <>
      {!modal ? (
        <Button className={className} onClick={handleClick}>
          {text}
        </Button>
      ) : (
        <Modal
          modalText={text}
          modalTitle={modalTitle}
          modalDesc={modalDesc}
          className={className}
          action={handleClick}
        />
      )}
    </>
  );
}

function toastInfoMaker(actionType: string) {
  let toastInfo;
  switch (actionType) {
    case 'logout':
      toastInfo = { message: logoutToastInfo.message, desc: logoutToastInfo.desc };
      break;

    case 'delete-account':
      toastInfo = {
        message: deleteAccountToastInfo.message,
        desc: deleteAccountToastInfo.desc,
      };
      break;

      case 'delete-notes':
        toastInfo = {
          message: 'you have successfully deleted all categories and notes',
          desc: '',
        };
        break;

    default:
      break;
  }

  return toastInfo;
}
