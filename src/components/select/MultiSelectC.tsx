import Select from 'react-select';

type MultiSelectCProps = {
    name: string;
    data: any;
    form: any;
    defaultValue?: SelectType[];
}
type SelectType = {
    value: string;
    label: string;
}
const MultiSelectC = ({ name, data, form, defaultValue }: MultiSelectCProps) => (
    <Select
        isMulti
        name={name}
        options={data}
        defaultValue={defaultValue}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(selectedOption: any) => {
            form.setValue(name, selectedOption.map((option: any) => option.value));
        }}
    />
);
export default MultiSelectC;
