import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const [mountNode, setMountNode] = useState<null | Element>(null);

  useEffect(() => {
    setMountNode(document.body);
  }, []);

  return <>{mountNode ? createPortal(children, mountNode) : mountNode}</>;
};

export default Portal;
