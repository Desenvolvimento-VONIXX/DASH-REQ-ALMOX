import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { JX } from "../../lib/JX";
import { get } from "http";
import { useEffect } from 'react';



function FormCabecalho({nota, codparc}) {
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

    const handleSaveSignature =  async () => {
        if (signatureRef.current) {

            function getSessionToken() {
                return JX.getCookie('JSESSIONID').replace(/\..*/, '');
            }


            await gravarTabelaAssinatura();
            await acionarBtnFaturar();
            const sessionToken = getSessionToken();


            const imageBase64 = signatureRef.current.toDataURL();
           

            // Converta para Blob
            const blob = dataURLToBlob(imageBase64);

            // Configure os dados do formulário
            const formData = new FormData();
            formData.append('img', blob, 'signature.png'); 
            formData.append('codigo', sessionToken); 
            formData.append('nunota', nota); 
            //formData.append('NOTADEST',nunotaDestino)

            // fetch('http://192.168.0.10:5000/avalicoesriscos-1.0/api/avaliacao/insereImg', {
            //     mode: 'no-cors',
            //     method: 'POST',
            //     body: formData,
            // })
            //     .then((response) => {
            //         if (!response.ok) {
            //             throw new Error(`Erro na requisição: ${response.status}`);
            //         }
            //         return response.json();
            //     })
            //     .then((data) => {
            //         console.log('Resposta do servidor:', data);
            //     })
            //     .catch((error) => {
            //         console.error('Erro ao enviar:', error);
            //     });


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
    

    const gravarTabelaAssinatura = async() =>{
        let assinatura ={
            NUNOTA: nota,
            NOTADEST: 0
        }

        await JX.salvar(assinatura,"AD_ASSINATURAALMOX",[{}]).then(console.log);
    }

    const acionarBtnFaturar = async() =>{
        console.log("ACIONAR BOTAO = "+nota)
       await JX.acionarBotao (
            {
                NUNOTA: nota
            },
            {
                tipo         : 'JAVA',         // Tipo do botao de acao (JS, JAVA e SQL)
                idBotao      : 432
            }
        ).then((response) =>{
            if (response.status == 1) {
                console.log('SALVOU: '+response);
            }else{console.log('DEU ERRO: '+response)}
        });
    }
    
    



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
                    Entregar
                </button>
            </form>
        </>
    );
}

export default FormCabecalho;





