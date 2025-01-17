
type InputProps = {
    form: any;
    name: string;
    placeholder?: string;
    type?: string;
}
const Input = ({ form, name, placeholder, type }: InputProps) => {
    return (
        <>
            <input
                type={type || 'text'}
                placeholder={placeholder || ''}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                {...form.register(name)}
            />
            {
                form.formState.errors[name] && (
                    <span className="text-red-500 text-sm mt-1 block">
                        {form.formState.errors[name].message}
                    </span>
                )
            }
        </>
    );
}

export default Input;