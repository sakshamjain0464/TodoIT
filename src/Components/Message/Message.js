import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ShowMessage(message, type) {
  if (type == 'success') {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  else if (type == 'error') {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  else {
    alert("toast error")
  }
}
