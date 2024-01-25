import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ShowMessage(message, type) {

  const toastPosition = toast.POSITION.TOP_RIGHT;
  if (type == 'success') {
    toast.success(message, {
      position: toastPosition,
    });
  }
  else if (type == 'error') {
    toast.error(message, {
      position: toastPosition,
    });
  }
  else if (type == 'warning') {
    toast.warn(message, {
      position: toastPosition
    })
  }
  else {
    alert("toast error")
  }
}
