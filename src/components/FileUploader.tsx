import { FileArrowUpIcon } from "@phosphor-icons/react";

const FileUploader = ({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);

      onFileSelect(e.target.files[0]);
      e.target.value = "";
    }
  };
  return (
    <div>
      <label className="flex items-center bg-sky-50 border-primary border text-primary ml-4 px-2 py-2 rounded-full hover:bg-sky-200 cursor-pointer">
        <FileArrowUpIcon size={24} />

        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  );
};

export default FileUploader;
