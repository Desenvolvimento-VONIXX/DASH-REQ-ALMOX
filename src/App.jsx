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
