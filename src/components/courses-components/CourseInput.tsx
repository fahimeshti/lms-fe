import { ForwardedRef, forwardRef } from 'react';

type InputProps = {
    form?: any;
    placeholder?: string;
    type?: string;
    field?: any;
    defaultValue?: string;
    disabled?: boolean;
}

const CourseInput = forwardRef(({
    form,
    placeholder,
    type,
    field,
    defaultValue,
    disabled,
}: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <>
            <input
                ref={ref}
                type={type || 'text'}
                placeholder={placeholder || ''}
                defaultValue={defaultValue}
                disabled={disabled}
                className="w-full rounded-lg border-[1.5px] bg-white border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed cursor-auto disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                {...field}
                />
        </>
    );
});

// Adding display name for better debugging
CourseInput.displayName = 'CourseInput';

export default CourseInput;
