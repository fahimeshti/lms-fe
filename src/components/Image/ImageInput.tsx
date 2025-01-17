import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UseFormReturn } from 'react-hook-form';

type ImageInputProps = {
    form: UseFormReturn<any>;
    name: string;
    defaultValue?: string;
};

const ImageInput = ({ form, name, defaultValue }: ImageInputProps) => {
    const { register, setValue, formState: { errors }, clearErrors } = form;
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (defaultValue) {
            setImageUrl(defaultValue);
        }
    }, [defaultValue]);

    const uploadToImgBB = async (file: File) => {
        const apiKey = "f3ce67db6bc1c00aea8de94241832398"; // Replace with your ImgBB API key
        const formData = new FormData();

        formData.append('key', apiKey);
        formData.append('image', file);

        try {
            setLoading(true);
            const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const url = response.data.data.url;
            setImageUrl(url);
            setValue(name, url);
            clearErrors('image');
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            uploadToImgBB(e.target.files[0]);
        }
    };

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-12 gap-4'>
                {imageUrl && (
                    <div className='col-span-12 sm:col-span-4 w-full border h-52 rounded-md overflow-hidden'>
                        <img src={imageUrl} alt="Uploaded" className='w-full h-full object-contain' />
                    </div>
                )}
                <label className={`${imageUrl ? "col-span-12 sm:col-span-8" : "col-span-12"} border border-dashed rounded-md h-52 w-full flex items-center justify-center cursor-pointer hover:border-primary transition-colors duration-150`}>
                    <input
                        type="file"
                        accept="image/*"
                        {...register('image')}
                        onChange={handleImageChange}
                        disabled={loading}
                        hidden
                    />
                    <div className="flex flex-col items-center">
                        <span>{loading ? 'Uploading...' : 'Click here to upload an image'}</span>
                        <span className='text-sm'>Supported formats: JPG, PNG</span>
                    </div>
                </label>
            </div>
            {errors.image && (
                <p className="text-red-500 text-sm col-span-12 sm:col-span-8">
                    {typeof errors.image?.message === 'string' && errors.image.message}
                </p>
            )}
        </>
    );
};

export default ImageInput;
