import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  children: React.ReactNode;
}

const useModalPotal = () => {
  const [activeModal, setActiveModal] = useState(false);

  const getActiveModalState = () => activeModal;

  const openModal = () => {
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
  };

  const ModalPotal: React.FC<IProps> = ({ children }) => {
    const refContainer = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (document) {
        const modalWrapper = document.querySelector('#modal');
        refContainer.current = modalWrapper;
      }
    }, [mounted]);
    if (refContainer.current && activeModal && mounted) {
      console.log(children);
      return createPortal(
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 z-2">
          <div
            className="absolute w-full h-full bg-black bg-opacity-75 z-10"
            onClick={closeModal}
          />
          {children}
        </div>,
        refContainer.current
      );
    }
    return null;
  };

  return { getActiveModalState, openModal, closeModal, ModalPotal };
};

export default useModalPotal;
