import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { JX } from "../../lib/JX";
import { get } from "http";
import { useEffect } from "react";

function FormCabecalho({ nota, codparc, assinatura }) {
  const signatureRef = useRef(null);
  const [nunota, setNunota] = useState("");
  const [assinou, setAssinou] = useState(assinatura);
  const [erro, setErro] = useState("");

  useEffect(() => {
    //console.log('NUNOTA=',{nota})
    carregaAssinatura();
  }, []);

  const clearSignature = () => {
    signatureRef.current.clear();
    setErro("");
  };

  const carregaAssinatura = async () => {
    if (assinatura != 0) {
      let query =
        "SELECT ASSINATURA FROM AD_ASSINATURAALMOX WHERE NUNOTA = " +
        assinatura;
      
         await JX.consultar(query).then((image)=>{
            //console.log(image[0].ASSINATURA);
            const imgbase64 = `data:image/png;base64,${hexToBase64(image[0].ASSINATURA)}`;
            signatureRef.current.fromDataURL(imgbase64);
         });

       }
    }

    function hexToBase64(hexString) {
        // Remove o prefixo "0x" se existir
        if (hexString.startsWith("0x")) {
          hexString = hexString.slice(2);
        }
      
        // Converte a string hexadecimal para um buffer binário
        const binaryString = hexString.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join("");
      
        // Converte o buffer binário para base64
        return btoa(binaryString);
      }


    // Função para converter base64 para Blob
    const dataURLToBlob = (dataURL) => {
      const [header, data] = dataURL.split(",");
      const mime = header.match(/:(.*?);/)[1];
      const binary = atob(data);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: mime });
    };

    const handleSaveSignature = async () => {
      if (signatureRef.current.isEmpty()) {
        alert("O campo assinatura está vazio");
      } else {
        function getSessionToken() {
          return JX.getCookie("JSESSIONID").replace(/\..*/, "");
        }

        let notaMap = await pegaNotaDest();
        let nunotaDest = notaMap.map((item) => item.NUNOTA);

        const sessionToken = getSessionToken();

        const imageBase64 = signatureRef.current.toDataURL();
        console.log("COOKIE= " + sessionToken);

        // Converta para Blob
        const blob = dataURLToBlob(imageBase64);

        // Configure os dados do formulário
        const formData = new FormData();
        formData.append("img", blob, "signature.png");
        formData.append("codigo", sessionToken);
        formData.append("nunota", nota);
        formData.append("nunotadest", nunotaDest);

        fetch(
          "http://192.168.0.10:5000/avalicoesriscos-1.0/api/avaliacao/insereImg",
          {
            mode: "no-cors",
            method: "POST",
            body: formData,
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Resposta do servidor:", data);
          })
          .catch((error) => {
            console.error("Erro ao enviar:", error);
          });

        setAssinou(1);
        alert("Assinatura coletada.");
      }
    };

    const pegaNotaDest = async () => {
      let consulta =
        "SELECT TOP 1 NUNOTA FROM TGFVAR WHERE NUNOTAORIG = " + nota;
      return await JX.consultar(consulta);
    };

    // Função para baixar a imagem PNG
    const downloadSignature = () => {
      if (signatureRef.current) {
        const dataURL = signatureRef.current.toDataURL("image/png"); // Obtém o DataURL da assinatura
        const link = document.createElement("a");
        link.href = dataURL; // Define o link da imagem como o dataURL da assinatura
        link.download = "assinatura.png"; // Nome do arquivo a ser baixado
        link.click(); // Dispara o download
      } else {
        console.error("Assinatura não encontrada.");
      }
    };

    return (
      <>
        <form>
          <div className="flex space-x-4 mt-2">
            <div className="w-1/2">
              <label
                htmlFor="nunota"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
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
                className:
                  "w-[100%] h-[10vh] border border-gray-300 rounded-lg",
              }}
            />
            <div className="flex mt-3 gap-4">
              <button
                type="button"
                onClick={clearSignature}
                className={`focus:outline-none text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5  ${assinou ==0? "":"hidden"}`}
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={downloadSignature}
                className=" hidden focus:outline-none text-white ml-4 bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Baixar Assinatura
              </button>

              <button
                type="button"
                className={`focus:outline-none text-white ml-4 bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5  ${
                  assinou == 0 ? "" : "hidden"
                }`}
                onClick={handleSaveSignature}
              >
                Concluir
              </button>
            </div>
          </div>

          {erro && (
            <div className="mt-3 text-red-600 text-sm">
              <strong>Erro:</strong> {erro}
            </div>
          )}
        </form>
      </>
    );
  };


export default FormCabecalho;
