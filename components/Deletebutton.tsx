"use client";

import { deleteProduct } from "@/lib/actions";
import { useState } from "react";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({id} : DeleteButtonProps ) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleDeleteClick = async () => {
    setIsSubmitting(true);
    await deleteProduct(id);
    setIsSubmitting(false);
  };

  return (
    <>
      {isSubmitting ? (
        <p>hello</p>
      ) : (
        <a href="/" className="text-base text-white" onClick={handleDeleteClick}>
          Delete now
        </a>
      )}
    </>
  );
}

export default DeleteButton;