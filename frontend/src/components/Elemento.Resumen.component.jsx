import React from "react";

const ElementoResumen = ({ sumaTurnoNormal, sumaTurnoExtra, sumaDiaLibre, sumaVacaciones, sumaCumpleanios, email, nombre, _id }) => {                    
                    return(
                    <li value={ _id } key={ _id } class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">{ nombre }</div>
                            <div class="fw-bold">{ email }</div>
                            <div class="fw-bold">Turno Normal { sumaTurnoNormal } hs</div>
                            <div class="fw-bold">Turno Extra { sumaTurnoExtra} hs</div>
                            <div class="fw-bold">Día Libre { sumaDiaLibre } hs</div>
                            <div class="fw-bold">Vacaciones { sumaVacaciones } hs</div>
                            <div class="fw-bold">Cumpleaños { sumaCumpleanios } hs</div>
                        </div>
                    </li>
            );
};

export default ElementoResumen;