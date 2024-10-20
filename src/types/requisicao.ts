export interface RequisicaoElementoLista{
    id_requisicao:string,
    data_requisicao:Date,
    status_requisicao:boolean
}

export interface ListaRequisicao{
    listaRequisicao:Array<RequisicaoElementoLista>
}