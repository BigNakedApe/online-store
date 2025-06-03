import { useState } from 'react';

export function usePopup() {
  const [showSuccess, setShowSuccess] = useState(false);
  return { showSuccess, setShowSuccess };
}