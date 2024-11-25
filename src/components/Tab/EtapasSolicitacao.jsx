import { useState } from "react";
import { LuStickyNote } from "react-icons/lu";
import { AiFillProduct } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import FormCabecalho from "../Forms/FormCabecalho";
import FormItens from "../Forms/FormItens";
import TableItens from "../Table/TableItens";
import { FaTable } from "react-icons/fa";

function EtapasSolicitacao() {
    const [activeTab, setActiveTab] = useState("cabecalho");
    const [showFormItens, setShowFormItens] = useState(false);

    return (
        <>
            <div className="md:flex">
                <ul className="flex flex-col space-y-4 text-sm font-medium text-gray-500 md:mr-4 mb-4 md:mb-0">
                    <li>
                        <button
                            onClick={() => setActiveTab("cabecalho")}
                            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === "cabecalho"
                                ? "text-white bg-blue-700"
                                : "bg-gray-50 hover:bg-gray-100 "
                                }`}
                        >
                            <LuStickyNote className="w-4 h-4 mr-2 text-white-500" />
                            Cabeçalho
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab("itens")}
                            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === "itens"
                                ? "text-white bg-blue-700"
                                : "bg-gray-50 hover:bg-gray-100 "
                                }`}
                        >
                            <AiFillProduct className="w-4 h-4 mr-2 text-white-500" />
                            Itens
                        </button>
                    </li>
                </ul>

                <div className="p-6 bg-white text-medium text-gray-500 rounded-lg w-full">
                    {activeTab === "cabecalho" && (
                        <>
                            <h3 className="text-lg font-bold text-gray-700 mb-2">
                                Cabeçalho
                            </h3>
                            <FormCabecalho />
                        </>
                    )}

                    {activeTab === "itens" && (
                        <>
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-700 mb-2">
                                    Itens
                                </h3>

                                {showFormItens ? (
                                    <button
                                        className=" text-[20px] focus:outline-none text-blue-700 inline-flex items-center space-x-2 cursor-pointer font-bold"
                                        onClick={() => setShowFormItens(false)}
                                    >
                                        <FaTable />
                                    </button>
                                ) : (
                                    <span
                                        className="focus:outline-none text-blue-700 inline-flex items-center space-x-2 cursor-pointer font-bold"
                                        onClick={() => setShowFormItens(true)}
                                    >
                                        <FaPlus />
                                        <span>Adicionar Item</span>
                                    </span>
                                )}

                            </div>

                            {showFormItens ? (
                                <FormItens />
                            ) : (
                                <TableItens />
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default EtapasSolicitacao;
