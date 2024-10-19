import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user';
import { Imagem } from './imagem';

@Entity()
export class Requisicao {
  @PrimaryGeneratedColumn('uuid')
  id_requisicao!: string;

  @Column({ type: 'boolean', default: false})
  status_requisicao!: boolean;

  @Column({ type: 'bigint' })
  data_requisicao!: number;

  @Column({ type: 'bigint' })
  tempo_inicio_requisicao!: number;

  @Column({ type: 'bigint' })
  tempo_final_requisicao!: number;

  @ManyToOne(() => User, (User) => User.requisicoes)
  User!: User;
}
