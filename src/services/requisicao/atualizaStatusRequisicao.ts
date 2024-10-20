import { AppDataSource } from "../../config";
import { Requisicao } from "../../entity";

export const atualizaStatusRequisicao = async (requisicao: Requisicao): Promise<void> => {
    const requisicaoRepositorio = AppDataSource.getRepository(Requisicao);
    
    try {        
        await requisicaoRepositorio
        .createQueryBuilder()
        .update(Requisicao)
        .set({
            status_requisicao: true,
        })
        .where("id_requisicao = :id", { id: requisicao.id_requisicao })
        .execute();
    } catch (error) {
        console.log(`Descrição do erro: ${error}`)
    }
}