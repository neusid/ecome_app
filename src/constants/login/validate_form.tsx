import React, { useState } from "react";

type FormData = {
    email: string;
    password: string;
}

const FormValidationData: React.FC = () => {
    const [validate, setValidate] = useState<FormData>({ email: '', password: '' });

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setValidate({ ...validate, [name]: value });
    }


    const HandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Form Submited`, validate);
    }

    return (
        <>

        </>
    )

}