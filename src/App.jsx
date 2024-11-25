import { useState } from "react";
import "./index.css";
import { FaPlus } from "react-icons/fa";
import TableRequisicao from "./components/Table/TableRequisicoes";
import ModalNovaRequisicao from "./components/Modal/NovaRequisicao";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="bg-[#d2d8d6]">
        <div className="w-full flex items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-4">
            <img src="/img/LogoPreto.png" className="h-10" alt="Logo Vonixx" />
            <span className="text-[27px] font-bold text-gray-800 leading-none">
              REQUISIÇÃO ALMOXARIFADO
            </span>
          </div>

          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5 flex items-center space-x-2"
            onClick={() => setShowModal(true)}
          >
            <FaPlus />
            <span className="hidden sm:block">Nova Requisição</span>
          </button>
        </div>
      </nav>

      <div className="p-5">
        <TableRequisicao />
      </div>

      {showModal && (
        <ModalNovaRequisicao
          onClose={() => setShowModal(false)}

        />
      )}
    </>
  );
}

export default App;
