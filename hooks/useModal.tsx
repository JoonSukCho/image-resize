import { useState, useCallback } from 'react';

type UseModal = [boolean, () => void, () => void];

const useModal = (): UseModal => {
  const [openFlag, setOpenFlag] = useState<boolean>(false);

  const handleOpenModal = useCallback(() => {
    setOpenFlag(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenFlag(false);
  }, []);

  return [openFlag, handleOpenModal, handleCloseModal];
};

export default useModal;
