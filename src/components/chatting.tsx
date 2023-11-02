import { styled} from "styled-components";
import {useState} from "react";
import { auth, db, storage, } from "../firebase";
import {addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const Form = styled.form`
    display: flex;
    flex-direction: row;
    gap: 10px;
    background-color: #FBF5EF;
`;
//채팅치는 폼 
const TextArea = styled.textarea`
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
    &::placeholder {
        font-size: 16px;

    }
    border: none;
    &:focus {
        outline: none; // 기본 아웃라인 제거
        border-color: #FBF5EF; // 원하는 테두리 색상 설정. 여기서는 배경색과 동일하게 설정하였음.
    }
`;

const AttachFileButton = styled.label`
    cursor: pointer;
    display: flex;
    align-items:center;
    justify-content: center;
    height:50px;
    width: 50px;
    margin-top:7px;
    margin-right:3px;
    color:black;

    `;
    

const AttachFileInput = styled.input`
    display:none;
`;


const SubmitBtn = styled.button`

    cursor: pointer;
    display: flex;
    align-items:center;
    justify-content: center;
    height:50px;
    width: 50px;
    margin-top:7px;
    margin-right:3px;
    background-color: #FBF5EF;
    border:none;
`;



export default function SendMessageForm() {
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File|null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }
    const onFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if(files  && files.length === 1) {
            setFile(files[0]);
        }

    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // 줄바꿈을 방지합니다.
            onSubmit(e as any); // 메시지 전송 로직을 실행합니다.
        }
    }

    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user =auth.currentUser;

        if(isLoading || message === "" || message.length>180) return;
          

        try {
            setLoading(true);
            const doc = await addDoc(collection(db, "messages"), {    
                message,
                createdAt: Date.now(),
                username: user?.displayName || "Anonymous",
                userId: user?.uid,
                time: new Date(),
            });
            if(file) {
                const locationRef = ref(storage, `messages/${user?.uid}/${doc.id}`);
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc,{
                    photo:url,

                });
            }

            setMessage("")
            setFile(null)
        } catch(e) {
            console.log(e);
        }   finally {
            setLoading(false);
        }
    }
    return (
    <Form onSubmit={onSubmit}>
        <TextArea required rows={5} maxLength={180} onChange={onChange} onKeyDown={handleKeyDown} value={message} placeholder="메세지 입력 ..."/>
        <AttachFileButton htmlFor="file">
        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
</svg>
        </AttachFileButton>
        <AttachFileInput onChange={onFileChange} type="file"id="file" accept="image/*" />
        <SubmitBtn type="submit">
        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"></path>
</svg>
        </SubmitBtn>
   
        
    </Form>
    );
}