import { Grupo } from '../Grupo/grupo';

export class EmpleadoGrupo extends Grupo {

    private $group_id: number;
    private $selected: boolean;

    constructor(grupo?: {
        group_id: number,
        id: number,
        name: string
    }) {
        super(grupo);
        this.$group_id = grupo.group_id;
        this.$selected = true;
    }

    public get group_id(): number {
        return this.$group_id;
    }

    public set group_id(group_id: number) {
        this.$group_id = group_id;
    }

    public get selected(): boolean {
        return this.$selected;
    }

    public set selected(selected: boolean) {
        this.$selected = selected;
    }
}
