import { useState } from 'react';
import LoginModal from 'components/profile/LoginModal';

const SeungPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div>
      <h1>SeungPage</h1>
      <button onClick={() => setModalOpen(true)}>Start!</button>
      {modalOpen && <LoginModal setOpenModal={setModalOpen} />}
    </div>
  );
};

export default SeungPage;
