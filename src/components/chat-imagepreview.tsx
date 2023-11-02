import { useState } from "react";

const Preview = () => {
    const [imageSrc, setImageSrc]: any = useState(null);

    const onUpload = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise<void>((resolve) => { 
            reader.onload = () => {	
                setImageSrc(reader.result || null); // 파일의 컨텐츠
                resolve();
            };
        });
    }
    return (
        <>
        <img 
            width={'100%'} 
            src={imageSrc} 
        />
        </>
    )
}

export default Preview;