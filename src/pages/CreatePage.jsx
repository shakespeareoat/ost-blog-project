import { useState } from "react";
import { FormCreate } from "../components/FormCreate";
const CreatePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  return (
    <div className="container mx-auto px-4">
      <FormCreate post={formData} />
    </div>
  );
};

export default CreatePage;
