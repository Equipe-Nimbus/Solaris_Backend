import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { Requisicao } from './requisicao';

@Entity()
export class Imagem {
  @PrimaryColumn('text')
  id_imagem!: string;

  @Column('text')
  link_imagem!: string;

  @Column('numeric', { array: true })
  bbox_imagem!: number[];

  @Column('text', { array: true, nullable: true })
  mascaras_imagem: string;

  @Column('text', {array: true, nullable: true})
  links_download_imagem: string;

  @ManyToMany(() => Requisicao, { cascade: true, })
  @JoinTable()
  requisicoes: Requisicao[];
}
