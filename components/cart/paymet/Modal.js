import classes from "./modal.module.css"; // Asegúrate de importar los estilos de Tailwind CSS


const Modal = ({children,onClose}) => {
  return (
    <>
      <div className={classes.backdrop} onClick={onClose}/>
      <dialog open className={`${classes.modal}`}>
        <div className="p-4">
          <div className="flex justify-end">
            <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
