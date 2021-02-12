import { EmpleadoGrupo } from '../EmpleadoGrupo/empleado-grupo';
import { Grupo } from '../Grupo/grupo';

export class DetalleGrupo extends Grupo {

    private $active: boolean;
    private $empleados: Array<EmpleadoGrupo>;

    constructor(detalleGrupo?: {
        id: number,
        name: string,
        active: boolean,
        empleados: Array<EmpleadoGrupo>
    }) {
        super(detalleGrupo);
        this.$active = true;
        this.$empleados = detalleGrupo.empleados;
    }

    public get active(): boolean {
        return this.$active;
    }

    public set active(active: boolean) {
        this.$active = active;
    }

    public get empleados(): Array<EmpleadoGrupo> {
        return this.$empleados;
    }

    public set empleados(empleados: Array<EmpleadoGrupo>) {
        this.$empleados = empleados;
    }
}
