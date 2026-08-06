export type Address = {
  street: string;
  city: string;
  country: string;
  zip_code: string;
};

export interface IUser {
  id?: string;
  name: string;
  email: string;
  age?: number;
  addresses: Address[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  constructor(
    public name: string,
    public email: string,
    public addresses: Address[],
    public age?: number,
    public readonly id?: string,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  static create(name: string, email: string, addresses: Address[], age?: number): User {
    return new User(name, email, addresses, age);
  }

  static fromPrimitives(data: IUser): User {
    return new User(
      data.name,
      data.email,
      data.addresses,
      data.age,
      data.id,
      data.createdAt,
      data.updatedAt,
    );
  }

  toPrimitives(): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      addresses: this.addresses,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public updateDetails(props: {
    name?: string;
    email?: string;
    age?: number;
    addresses?: Address[];
  }): void {
    if (props.name !== undefined) this.name = props.name;
    if (props.email !== undefined) this.email = props.email;
    if (props.age !== undefined) this.age = props.age;
    if (props.addresses !== undefined) this.addresses = props.addresses;
    this.updatedAt = new Date();
  }
}
