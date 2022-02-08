import React from 'react';

interface IImageButtons {
  condition: string | boolean;
  containerClassName: string;
  uploadButtonName: string;
  editButtonName: string;
  deleteButtonName: string;
  uploadButtonEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editButtonEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteButtonEvent: () => void;
}

const ImageButtons: React.FC<IImageButtons> = ({
  condition, // 이미지가 올라가 있는지 아닌지 판단하는 조건이다.
  containerClassName,
  deleteButtonEvent,
  deleteButtonName,
  editButtonEvent,
  editButtonName,
  uploadButtonEvent,
  uploadButtonName,
}) => {
  return (
    <div className={`${containerClassName} flex px-2 gap-x-1`}>
      {!condition ? (
        <label
          htmlFor="upload-image"
          className="w-full flex flex-col items-center px-4 py-3 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple ease-linear transition-all duration-150"
        >
          {uploadButtonName}
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={uploadButtonEvent}
          />
        </label>
      ) : (
        <>
          <label
            htmlFor="edit-image"
            className="w-1/2 flex flex-col items-center px-4 py-3 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple ease-linear transition-all duration-150"
          >
            {editButtonName}
            <input
              id="edit-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={editButtonEvent}
            />
          </label>
          <button
            id="delete-image"
            type="button"
            className="w-1/2 flex flex-col items-center px-4 py-3 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple ease-linear transition-all duration-150"
            onClick={deleteButtonEvent}
          >
            {deleteButtonName}
          </button>
        </>
      )}
    </div>
  );
};

export default ImageButtons;
