export class Grupo {

    private $id: number;
    private $name: string;

    constructor(grupo?: {
        id: number,
        name: string
    }) {
        this.$id = grupo.id;
        this.$name = grupo.name;
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
}
