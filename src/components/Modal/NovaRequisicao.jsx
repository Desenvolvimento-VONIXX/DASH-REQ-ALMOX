import { IoCloseOutline } from "react-icons/io5";
import EtapasSolicitacao from "../Tab/EtapasSolicitacao";
import { useState } from "react";
import {JX} from "../../lib/JX";

function ModalNovaRequisicao({ onClose, nunota , codparc,situacao, assinatura}) {

    const [entrega, setEntrega] = useState(situacao)
    const faturarNota =  async () => {

        await JX.acionarBotao (
            {
                NUNOTA: nunota
            },
            {
                tipo         : 'JAVA',         // Tipo do botao de acao (JS, JAVA e SQL)
                idBotao      : 474      // NA TESTE É 432 NA PRODUÇÃO É 474
            }
        ).then((response) =>{
            if (response.status == 1) {
                console.log('SALVOU: '+response);
                alert('Nota faturada com sucesso, colete a assinatura.')
                setEntrega(1)
            }else{
                console.log('DEU ERRO: '+response)
                alert('Ocorreu um erro ao faturar a nota, tente novamente mais tarde.');
            }
        });

        
    };
  


    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-40" />

            <div
                id="static-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50"
            >
                <div className="relative w-screen h-screen bg-[#d2d8d6] shadow flex flex-col">
                    <div className="flex items-center justify-between p-4">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Novo Pedido de Requisição
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg w-8 h-8 inline-flex justify-center items-center"
                        >
                            <IoCloseOutline className="text-lg" />
                            <span className="sr-only">Fechar modal</span>
                        </button>
                    </div>

                    <div className="p-4 flex-grow overflow-y-auto">
                        <EtapasSolicitacao nota={nunota} codparc={codparc} situacao={entrega} assinatura={assinatura}/>
                   
                    </div>


                    <div className="flex items-center justify-end p-4 ">
                        {/* <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Finalizar
                        </button> */}
                        <button
                            type="button"
                            className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none"
                            onClick={onClose}
                        >
                            Fechar
                        </button>

                        <button
                            type="button"
                            className={`py-2.5 px-5 ml-4 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-lg  focus:outline-none ${entrega ==1 ?"hidden":""}`}
                            onClick={faturarNota}
                        >
                            Entregar
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalNovaRequisicao;
