import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { User } from './user';
import { Imagem } from './imagem';

@Entity()
export class Requisicao {
  @PrimaryGeneratedColumn('uuid')
  id_requisicao!: string;

  @Column({ type: 'boolean', default: false })
  status_requisicao!: boolean;

  @Column({ type: 'bigint' })
  data_requisicao!: number;

  @Column({ type: 'bigint' })
  tempo_inicio_requisicao!: number;

  @Column({ type: 'bigint' })
  tempo_final_requisicao!: number;

  @Column('numeric', { array: true })
  bbox_requisicao!: number[];

  @ManyToOne(() => User, (User) => User.requisicoes)
  User!: User;

  @ManyToMany(() => Imagem, (imagem) => imagem.requisicoes)
  imagens!: Imagem[];
}
