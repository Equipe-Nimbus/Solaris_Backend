import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Requisicao } from './requisicao';

@Entity()
export class Imagem {
  @PrimaryGeneratedColumn('uuid')
  id_imagem!: string;

  @Column('text', { array: true })
  svg_imagem!: string[];

  @Column('text', { array: true })
  coordenadas_imagem!: string[];

  @Column('text', { array: true })
  filtro_nuvem_imagem!: string[];

  @Column('text', { array: true })
  filtro_sombra_imagem!: string[];

  @ManyToOne(() => Requisicao, (requisicao) => requisicao.imagens)
  requisicao!: Requisicao;
}
