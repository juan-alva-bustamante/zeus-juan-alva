export class Empleado {

    private $id: number;
    private $name: string;
    private $last_name: string;
    private $birthday: number;

    constructor(empleado?: {
        id: number,
        name: string,
        last_name: string,
        birthday: number,
    }) {
        this.$id = empleado.id;
        this.$name = empleado.name;
        this.$last_name = empleado.last_name;
        this.$birthday = empleado.birthday;
    }

    public get id(): number {
        return this.$id;
    }

    public set id(id: number) {
        this.$id = id;
    }

    public get name(): string {
        return this.$name;
    }

    public set name(name: string) {
        this.$name = name;
    }

    public get last_name(): string {
        return this.$last_name;
    }

    public set last_name(last_name: string) {
        this.$last_name = last_name;
    }

    public get birthday(): number {
        return this.$birthday;
    }

    public set birthday(birthday: number) {
        this.$birthday = birthday;
    }
}
