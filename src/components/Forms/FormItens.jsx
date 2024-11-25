function FormItens() {
    return (
        <>
            <form>
                <div className="flex space-x-4 mt-2">
                    <div className="w-1/2">
                        <label htmlFor="small-input-1" className="block mb-2 text-sm font-medium text-gray-900">
                            Produto
                        </label>
                        <input
                            type="text"
                            id="small-input-1"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="small-input-2" className="block mb-2 text-sm font-medium text-gray-900">
                            Quantidade
                        </label>
                        <input
                            type="text"
                            id="small-input-2"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs "
                        />
                    </div>
                </div>
                <div className="flex space-x-4 mt-2">
                    <div className="w-1/2">
                        <label htmlFor="small-input-2" className="block mb-2 text-sm font-medium text-gray-900">
                            Local de Origem
                        </label>
                        <input
                            type="text"
                            id="small-input-2"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs "
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="small-input-1" className="block mb-2 text-sm font-medium text-gray-900">
                            Parceiro
                        </label>
                        <input
                            type="text"
                            id="small-input-1"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs "
                        />
                    </div>
                </div>
                <div className="flex space-x-4 mt-2">

                    <div className="w-1/2">
                        <label htmlFor="small-input-2" className="block mb-2 text-sm font-medium text-gray-900">
                            Tipo de Operação
                        </label>
                        <input
                            type="text"
                            id="small-input-2"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs "
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="small-input-1" className="block mb-2 text-sm font-medium text-gray-900">
                            Centro Resultado
                        </label>
                        <input
                            type="text"
                            id="small-input-1"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs "
                        />
                    </div>
                </div>
                <div className="flex space-x-4 mt-2">
                    <div className="w-1/2">
                        <label htmlFor="small-input-1" className="block mb-2 text-sm font-medium text-gray-900">
                            Empresa
                        </label>
                        <input
                            type="text"
                            id="small-input-1"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs "
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="small-input-2" className="block mb-2 text-sm font-medium text-gray-900">
                            Natureza
                        </label>
                        <input
                            type="text"
                            id="small-input-2"
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                        />
                    </div>
                </div>
                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5"> Salvar</button>

            </form>

        </>
    )
}

export default FormItens;

