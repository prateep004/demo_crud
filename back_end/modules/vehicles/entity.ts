// src/modules/vehicles/entity.ts
import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "vehicles" })
export class Vehicles {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    vehicle_nm: string

    @Column()
    vehicle_num: string

    @Column()
    vehicle_brand: string
    
    @Column()
    vehicle_engine_size: number

    @Column()
    vehicle_engine_num: string

    @CreateDateColumn()
    created_at: string

    @CreateDateColumn()
    updated_at: string
}