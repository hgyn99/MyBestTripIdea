import { styled} from "styled-components";
import {useState} from "react";


const Title = styled.div`
    height:60px;
    padding:20px;
    font-size:16px;
    color: black;
    background-color: #FBF5EF;
    width:100%;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, 
    "Open Sans", "Helvetica Neue", sans-serif;
    overflow-y:hidden;


`;


export default function SendMessageForm() {

   
    return (
        <Title/>
    );
}