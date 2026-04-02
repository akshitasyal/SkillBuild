"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { FiUpload, FiX, FiCheck } from "react-icons/fi";

const ImageUpload = ({ files, setFile }) => {
    const [previews, setPreviews] = useState([]);

    const onSelectFile = useCallback((e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            setFile((prevFiles) => [...prevFiles, ...selectedFiles]);
            
            const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
            setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
        }
    }, [setFile]);

    const removeFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFile(newFiles);

        const newPreviews = [...previews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-4 mb-4">
                {previews.map((preview, index) => (
                    <div key={preview} className="relative w-32 h-32 border-2 border-fiverr-border rounded-lg overflow-hidden group">
                        <Image src={preview} alt="preview" fill className="object-cover" />
                        <button 
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <FiX size={14} />
                        </button>
                    </div>
                ))}
                
                {files.length < 5 && (
                    <label className="w-32 h-32 border-2 border-dashed border-fiverr-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-fiverr-green hover:bg-fiverr-light/5 transition-all">
                        <FiUpload className="text-2xl text-fiverr-gray mb-2" />
                        <span className="text-xs text-fiverr-gray font-medium text-center px-2">Click to upload images</span>
                        <input 
                            type="file" 
                            multiple 
                            accept="image/*" 
                            className="hidden" 
                            onChange={onSelectFile} 
                        />
                    </label>
                )}
            </div>
            
            <p className="text-xs text-fiverr-gray">
                Add up to 5 professionally shot images (max 5MB each).
            </p>
        </div>
    );
};

export default ImageUpload;
