/*import styled from "styled-components";
import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// SendMessageForm.tsx
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: fixed; // 고정된 위치로 설정합니다.
    bottom: 0; // 화면 하단에 배치합니다.
    left: 0; // 화면 왼쪽에 배치합니다.
    width: 100%; // 화면 너비 전체를 차지하게 합니다.
    background-color: white; // 배경 색상을 지정합니다.
    padding: 10px; // 패딩을 추가하여 디자인을 조절합니다.
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); // 상단에 그림자 효과를 추가합니다.
`;


const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: white;
    width: 100%;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, 
    "Open Sans", "Helvetica Neue", sans-serif;

    &::placeholder {
        font-size: 16px;
    }
`;

const AttachFileButton = styled.label`
    padding: 10px 0px;
    color: #1d9bf0;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #1d9bf0;
    font-size: 14px;
    font-weight: 066;
    cursor: pointer;
`;

const AttachFileInput = styled.input`
    display: none;
`;

const SubmitBtn = styled.input`
    background-color: #1d9bf0;
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;

    &:hover,
    &:active {
        opacity: 0.9;
    }
`;

export default function SendMessageForm() {
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]);
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (isLoading || message === "" || message.length > 180) return;

        try {
            setLoading(true);
            const doc = await addDoc(collection(db, "messages"), {
                message,
                createdAt: Date.now(),
                username: user?.displayName || "Anonymous",
                userId: user?.uid,
            });

            if (file) {
                const locationRef = ref(storage, `messages/${user?.uid}/${doc.id}`);
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc, {
                    photo: url,
                });
            }

            setMessage("");
            setFile(null);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <AttachFileButton htmlFor="file">{file ? "Photo Added✅" : "Add Photo"}</AttachFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
            <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"} />
            <TextArea required rows={5} maxLength={180} onChange={onChange} value={message} placeholder="What is happening?" />
        </Form>
    );
}*/
