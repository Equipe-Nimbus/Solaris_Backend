import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Requisicao } from './requisicao';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id_user!: string;

  @Column()
  nome_user!: string;

  @Column({ unique: true })
  email_user!: string;

  @Column()
  senha_user!: string;

  @Column({ unique: true })
  cpf_user!: string;

  @OneToMany(() => Requisicao, (requisicao) => requisicao.User)
  requisicoes!: Requisicao[];
}