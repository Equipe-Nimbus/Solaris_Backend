import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { Requisicao } from './requisicao';

@Entity()
export class Imagem {
  @PrimaryColumn('text')
  id_imagem!: string;

  @Column('text')
  link_imagem_tiff!: string;

  @Column('text')
  link_imagem_thumbnail!: string;

  @Column('numeric', { array: true })
  bbox_imagem!: number[];

  @Column('text', {nullable: true })
  mascaras_imagem: string;

  @Column('text', {nullable: true})
  links_download_imagem: string;

  @Column('text', {nullable: true})
  data_imagem_criacao: string

  @Column('text', {nullable: true})
  estatistica_fundo: string;

  @Column('text', {nullable: true})
  estatistica_nuvem: string;

  @Column('text', {nullable: true})
  estatistica_sombra: string;

  @ManyToMany(() => Requisicao, (requisicao) => requisicao.imagens)
  requisicoes: Requisicao[];
  }
