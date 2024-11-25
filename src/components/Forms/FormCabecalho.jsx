import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { JX } from "../../lib/JX";

function FormCabecalho() {
    const signatureRef = useRef(null);
    const [nunota, setNunota] = useState('');
    const [erro, setErro] = useState('');

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

    const handleSaveSignature = () => {
        if (signatureRef.current) {
            const dataURL = signatureRef.current.toDataURL('image/png');  // Converte a assinatura para um DataURL base64
            const base64String = dataURL.replace(/^data:image\/png;base64,/, '');  // Remove o prefixo base64
            const hexString = base64ToHex(base64String);  // Converte o base64 para hexadecimal
    
            console.log('Assinatura em Hexadecimal:', hexString);
    
            JX.salvar(
                {
                    ASSINATURA: `0x${hexString}`  
                },
                "AD_ASSINATURAALMOX",
                [
                    {
                        NUNOTA: 2143823, 
                    },
                ]
            )
                .then((data) => {
                    const response = data[0];
                    if (response.status === "0") {
                        setErro(response.statusMessage);
                    } else {
                        setErro('');
                        alert('Assinatura salva com sucesso!');
                    }
                })
                .catch((error) => {
                    console.error('Erro ao salvar:', error);
                    setErro('Erro ao salvar a assinatura. Tente novamente.');
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
                            value={nunota}
                            onChange={(e) => setNunota(e.target.value)}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
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
