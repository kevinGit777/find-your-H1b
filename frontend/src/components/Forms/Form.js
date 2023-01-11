import React, {useState} from "react";
import { Input, Space } from 'antd';

const { Search } = Input;


export const Form1 = (props) =>{
    const [input, setInput] = useState("");
    const {handleSubmit, placeholder} = props

    const handleChange = ({target}) =>{
        setInput(target.value)
    }

    const onSearch = (v,e) =>{
        e.preventDefault();
        handleSubmit(v);
        // alert("hello")
        setInput("");
    }


    return (
            <Search placeholder={placeholder} onSearch={onSearch} enterButton value={input} onChange={handleChange}/>
    )
}
