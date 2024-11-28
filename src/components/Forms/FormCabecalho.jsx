import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { JX } from "../../lib/JX";
import { get } from "http";
import { useEffect } from 'react';



function FormCabecalho({nota}) {
    const signatureRef = useRef(null);
    const [nunota, setNunota] = useState('');
    const [erro, setErro] = useState('');
    

    useEffect(()=>{
        console.log('NUNOTA=',{nota})
        
    },[])

    const clearSignature = () => {
        signatureRef.current.clear();
        setErro(''); 
    };

    const base64ToHex = (base64Str) => {
        const binaryString = atob(base64Str);  
        let hexString = '';
    
        for (let i = 0; i < binaryString.length; i++) {
            const hex = binaryString.charCodeAt(i).toString(16).padStart(2, '0');
            hexString += hex;
        }
    
        return hexString;  
    };

        // Função para converter base64 para Blob
        const dataURLToBlob = (dataURL) => {
            const [header, data] = dataURL.split(',');
            const mime = header.match(/:(.*?);/)[1];
            const binary = atob(data);
            const array = [];
            for (let i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], { type: mime });
        };

    const handleSaveSignature =  () => {
        if (signatureRef.current) {

            function getSessionToken() {
                return JX.getCookie('JSESSIONID').replace(/\..*/, '');
            }
        
            const sessionToken = getSessionToken();


            const imageBase64 = signatureRef.current.toDataURL();
            console.log('Imagem Base64:', imageBase64);

            // Converta para Blob
            const blob = dataURLToBlob(imageBase64);

            // Configure os dados do formulário
            const formData = new FormData();
            formData.append('img', blob, 'signature.png'); // Adiciona o Blob com nome de arquivo
            formData.append('codigo', sessionToken); // Substitua pelo código real
            formData.append('nunota', '12345675'); // Substitua pelo número real

            fetch('http://192.168.0.10:5000/avalicoesriscos-1.0/api/avaliacao/insereImg', {
                mode: 'no-cors',
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Erro na requisição: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Resposta do servidor:', data);
                })
                .catch((error) => {
                    console.error('Erro ao enviar:', error);
                });


        } else {
            console.error('Nenhuma assinatura encontrada.');
            setErro('Assinatura não encontrada.');
        }
    };

    // Função para baixar a imagem PNG
    const downloadSignature = () => {
        if (signatureRef.current) {
            const dataURL = signatureRef.current.toDataURL('image/png');  // Obtém o DataURL da assinatura
            const link = document.createElement("a");
            link.href = dataURL;  // Define o link da imagem como o dataURL da assinatura
            link.download = "assinatura.png";  // Nome do arquivo a ser baixado
            link.click();  // Dispara o download
        } else {
            console.error("Assinatura não encontrada.");
        }
    };

    return (
        <>
            <form>
                <div className="flex space-x-4 mt-2">
                    <div className="w-1/2">
                        <label htmlFor="nunota" className="block mb-2 text-sm font-medium text-gray-900">
                            Nro. Nota
                        </label>
                        <input

                            type="text"
                            id="nunota"
                            value={nota}
                            onChange={(e) => setNunota(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                            disabled
                        />
                    </div>
                </div>

                <div className="mt-5">
                    <h2 className="text-lg font-semibold mb-2">Assinatura:</h2>
                    <SignatureCanvas
                        ref={signatureRef}
                        penColor="black"
                        canvasProps={{
                            className: "w-[100%] h-[10vh] border border-gray-300 rounded-lg",
                        }}
                    />
                    <div className="flex mt-3 gap-4">
                        <button
                            type="button"
                            onClick={clearSignature}
                            className="focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Limpar
                        </button>
                        <button
                            type="button"
                            onClick={downloadSignature}
                            className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Baixar Assinatura
                        </button>
                    </div>
                </div>

                {erro && (
                    <div className="mt-3 text-red-600 text-sm">
                        <strong>Erro:</strong> {erro}
                    </div>
                )}

                <button
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5"
                    onClick={handleSaveSignature}
                >
                    Salvar
                </button>
            </form>
        </>
    );
}

export default FormCabecalho;


async function  consumindoApiAvaliacao(file){
    function getSessionToken() {
        return JX.getCookie('JSESSIONID').replace(/\..*/, '');
    }

    const sessionToken = getSessionToken();
    

        const url = 'http://192.168.0.10:5000/avalicoesriscos-1.0/api/avaliacao/insereImg';

    

          

          const formData = new FormData();
          formData.append("nunota", 1234569);
          formData.append("img", file);
          formData.append("codigo", sessionToken);


         console.log(formData.values);
              const response = await fetch(url, {
                  method: "POST", 
                  headers: {
                      "Content-Type": "multipart/form-data" 
                  },
                  mode: 'no-cors',
                  body: formData
              });
              
              console.log("token="+sessionToken + " responsew="+response);
              if(response.status == 200 || response.status == 201 || response.status == 1){
                alert('Assinatura salva com sucesso!');
              }else {alert('Não foi possível salvar assinatura')}


}


