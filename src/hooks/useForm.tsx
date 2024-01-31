import { useState } from 'react';

export const useForm = <T extends Object>(initState: T) => {

    const [state, setState] = useState(initState);


    const setFormValue = (form: T) => {
        setState(form)
        // setState({
        //     ...state,
        //     ...form
        // })
    }

    const onChange = (value: string, field: keyof T) => {
        setState({
            ...state,
            [field]: value
        });
    }

    return {
        ...state,
        form: state,
        onChange,
        setFormValue
    }

}
