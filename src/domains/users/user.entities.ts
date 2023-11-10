import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import bcrypt from "bcrypt";

/**
 * Represents a User within the application.
 * @entity users - Table name in the database
 */
@Entity({ name: "users" })
export class User {
  /**
   * Unique identifier for the user.
   */
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /**
   * The email address of the user. Must be unique.
   */
  @Column({ type: "varchar", unique: true })
  email!: string;

  /**
   * The hashed password of the user.
   */
  @Column({ type: "varchar" })
  password!: string;

  /**
   * The user's first name (if provided).
   */
  @Column({ type: "varchar", nullable: true })
  firstName?: string;

  /**
   * The user's last name (if provided).
   */
  @Column({ type: "varchar", nullable: true })
  lastName?: string;

  /**
   * Timestamp indicating when the user was created.
   */
  @CreateDateColumn()
  createdAt!: Date;

  /**
   * Timestamp indicating the last time the user was updated.
   */
  @UpdateDateColumn()
  updatedAt!: Date;

  /**
   * Hook to hash the user's password before inserting or updating.
   */
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  /**
   * Compare the given password with the user's hashed password.
   * @param unencryptedPassword - The plain text password to compare against the hashed password.
   * @returns Whether the passwords match.
   */
  checkPassword(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
