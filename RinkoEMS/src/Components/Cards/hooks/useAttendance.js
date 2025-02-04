import { useForm, useFieldArray } from "react-hook-form";


const useAttendance = (defaultValue) => {
    const form = useForm({
        mode: 'onBlur',
        values: {
            ...defaultValue
        }
    });

    const { control } = form


    const { fields, append, remove } = useFieldArray({
        control,
        name: "attendance"
    });

    return {
        fields,
        append,
        remove,
        form
    }
}

export default useAttendance